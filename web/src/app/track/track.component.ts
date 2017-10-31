import { Component, OnInit, ViewChild, Output, OnDestroy  } from '@angular/core';
import { SegmentComponent } from '../segment/segment.component';
import { TrackWindow } from '../model/track.window';
import { SegmentService } from '../service/segment.service';
import { SegmentDrawing } from '../track/segment.drawing';
import { WindowCenter } from '../track/window.center';
import {Option, option, some, none} from 'ts-option';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'track',
  templateUrl: './track.component.html',
  providers: [SegmentService]
})
export class TrackComponent implements OnInit, OnDestroy {

  @ViewChild(SegmentComponent)
  private segmentComponent: SegmentComponent;
  @Output() maxSpeed = 0;
  maxSpeedSubscription: Subscription;

  trackWindow: TrackWindow;
  segmentDrawing:SegmentDrawing;
  windowCenter:WindowCenter;
  segmentsLoaded = false;

  constructor(private segmentService: SegmentService) {
    this.trackWindow = new TrackWindow();
  }

  ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.maxSpeedSubscription.unsubscribe();
  }

  getSegments(): void {
    this.segmentService.getSegmentsRest().then(
        (val) => this.handleSegments(val),
        (err) => {
          this.segmentsLoaded = false;
          console.error(err);
        }
      );
  }
  handleSegments(segs){
    this.segmentsLoaded = true;
    this.segmentDrawing = new SegmentDrawing(this.segmentComponent, segs);
    this.windowCenter = new WindowCenter(segs);
    this.center(0);
    // this.centerOnTime();
    this.maxSpeedSubscription = this.segmentDrawing.speedStats.observeMaxSpeed().subscribe(
      speed => {
        this.maxSpeed = speed;
      });
    this.segmentDrawing.drawSegments();
  }
  // TODO: show point over 100% speed
  centerOnTime(){
      this.trackWindow.center = this.windowCenter.getCenterOnTime(new Date('2017-10-08T15:46:43.000Z')).
            getOrElse(this.segmentDrawing.getTrackCenter());
  }

  ngOnInit(): void {
    this.segmentComponent.trackWindow = this.trackWindow;
    this.getSegments();
  }

  handleZoomChange(event: number): void {
    this.checkSegmentsLoaded();
    this.trackWindow.setZoom(event);
    this.segmentDrawing.drawSegments();
  }

  handleTimeChange(event: number): void {
    this.checkSegmentsLoaded();
    this.center(event);
    this.segmentDrawing.drawSegments();
  }
  center(percent){
    this.trackWindow.center = this.windowCenter.getCenterOnPercTime(percent).
          getOrElse(this.segmentDrawing.getTrackCenter());
  }
  checkSegmentsLoaded():void{
    if(!this.segmentsLoaded){
      throw new Error('segments not loaded.');
    }
  }
}
