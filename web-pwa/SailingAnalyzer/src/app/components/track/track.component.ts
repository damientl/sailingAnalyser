import { Component, OnInit, ViewChild, Output, OnDestroy, Input, EventEmitter  } from '@angular/core';
import { SegmentComponent } from '../segment/segment.component';
import { TrackWindow } from '../model/track.window';
import { SegmentService } from '../service/segment.service';
import { SegmentDrawing } from '../track/segment.drawing';
import { WindowCenter } from '../track/window.center';
import {Option, option, some, none} from 'ts-option';

import { Line } from '../model/line';
import { Subscription } from 'rxjs';

@Component({
  selector: 'track',
  templateUrl: './track.component.html',
  providers: [SegmentService]
})
export class TrackComponent implements OnInit, OnDestroy {

  @ViewChild(SegmentComponent)
  private segmentComponent: SegmentComponent;
  maxSpeed = 0;
  maxSpeedSubscription: Subscription;

  @Input()
  segmentsLoad: EventEmitter<any>;

  trackWindow: TrackWindow;
  segmentDrawing:SegmentDrawing;
  windowCenter:WindowCenter;
  segmentsLoaded = false;

  constructor(private segmentService: SegmentService) {
    this.trackWindow = new TrackWindow();
  }

  getSegments(): void {
    this.segmentService.getSegmentsRest().then(
        (val) => this.handleSegmentsLoaded(val),
        (err) => {
          this.segmentsLoaded = false;
          console.error(err);
        }
      );
  }
  handleSegmentsLoaded(segs) {
    this.segmentsLoaded = true;
    this.segmentDrawing = new SegmentDrawing(this.trackWindow, segs);
    this.windowCenter = new WindowCenter(segs);
    this.centerOnPercTime(0);
    // this.centerOnTime();
    this.maxSpeedSubscription = this.segmentDrawing.speedStats.observeMaxSpeed().subscribe(
      speed => {
        this.maxSpeed = speed;
      });
    this.drawSegments();
  }
  // TODO: show point   over 100% speed
  drawSegments(percent?) {
    this.segmentComponent.clearSegments();
    this.segmentComponent.drawLines(this.segmentDrawing.getSegmentLines());

    if (!percent) {
      percent = 0;
    }

    this.segmentComponent.drawPoint(this.segmentDrawing.getCenterPoint(
      this.windowCenter.getCenterOnPercTime(percent).
            getOrElse(this.segmentDrawing.getTrackCenter())
    ), 10);
  }
  centerOnTime() {
      this.trackWindow.center = this.windowCenter.getCenterOnTime(new Date('2017-10-08T15:46:43.000Z')).
            getOrElse(this.segmentDrawing.getTrackCenter());
  }

  ngOnInit(): void {
    this.segmentComponent.trackWindow = this.trackWindow;
    // this.getSegments();
    this.segmentsLoad.subscribe(segments => {
      console.log('segments loaded');
      this.handleSegmentsLoaded(segments);
    });
  }

  handleZoomChange(event: number): void {
    this.checkSegmentsLoaded();
    this.trackWindow.setZoom(event);
    this.drawSegments();
  }

  handleTimeChange(event: number): void {
    this.checkSegmentsLoaded();
    this.centerOnPercTime(event);
    this.drawSegments(event);
  }
  centerOnPercTime(percent) {
    this.trackWindow.center = this.windowCenter.getCenterOnPercTime(percent).
          getOrElse(this.segmentDrawing.getTrackCenter());
  }
  checkSegmentsLoaded() {
    if (!this.segmentsLoaded) {
      throw new Error('segments not loaded.');
    }
  }

  ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.maxSpeedSubscription.unsubscribe();
  }
}
