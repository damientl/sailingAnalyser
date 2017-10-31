import { Component, OnInit, ViewChild } from '@angular/core';
import { SegmentComponent } from '../segment/segment.component';
import { TrackWindow } from '../model/track.window';
import { SegmentService } from '../service/segment.service';
import { SegmentDrawing } from '../track/segment.drawing';
import { WindowCenter } from '../track/window.center';
import {Option, option, some, none} from 'ts-option';

@Component({
  selector: 'track',
  templateUrl: './track.component.html',
  providers: [SegmentService]
})
export class TrackComponent implements OnInit  {

  @ViewChild(SegmentComponent)
  private segmentComponent: SegmentComponent;

  trackWindow: TrackWindow;
  segmentDrawing:SegmentDrawing;
  windowCenter:WindowCenter;
  segmentsLoaded = false;

  constructor(private segmentService: SegmentService) {
    this.trackWindow = new TrackWindow();
  }
  getSegments(): void {
    this.segmentService.getSegmentsRest().then(
        (val) => {
          this.segmentsLoaded = true;
          this.segmentDrawing = new SegmentDrawing(this.segmentComponent, val);
          this.windowCenter = new WindowCenter(val);
          this.center(0);
          // this.centerOnTime();
          this.segmentDrawing.drawSegments();
        },
        (err) => {
          this.segmentsLoaded = false;
          console.error(err);
        }
      );
  }
  // TODO: show point over 100% speed, and allow set max speed on screen
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
