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
          this.segmentDrawing.drawSegments();
        },
        (err) => {
          this.segmentsLoaded = false;
          console.error(err);
        }
      );
  }


  ngOnInit(): void {
    this.segmentComponent.trackWindow = this.trackWindow;
    this.getSegments();
  }

  handleZoomChange(event: number): void {
    if(!this.segmentsLoaded){
      return;
    }
    console.log(event);
    this.trackWindow.setZoom(event);
    this.segmentDrawing.drawSegments();
  }

  handleTimeChange(event: number): void {
    if(!this.segmentsLoaded){
      return;
    }
    this.trackWindow.center = this.windowCenter.centerOnTime(event).
          getOrElse(this.segmentDrawing.getTrackCenter());
    this.segmentDrawing.drawSegments();
  }

}
