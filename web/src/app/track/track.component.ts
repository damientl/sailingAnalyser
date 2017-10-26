import { Component, OnInit, ViewChild } from '@angular/core';
import { SegmentComponent } from '../segment/segment.component';
import { Segment } from '../model/segment';
import { TrackWindow } from '../model/track.window';
import { SpeedMath } from '../util/speed.math';
import { CanvasMath } from '../util/canvas.math';
import { Borders } from '../model/borders';
import { SegmentService } from '../service/segment.service';
import { CanvasPoint } from '../model/canvas.point';
import { DateUtil } from '../util/date.util';
import { SegmentDrawing } from '../util/segment.drawing';

@Component({
  selector: 'track',
  templateUrl: './track.component.html',
  providers: [SegmentService]
})
export class TrackComponent implements OnInit  {

  @ViewChild(SegmentComponent)
  private segmentComponent: SegmentComponent;

  segments: Segment[];
  trackWindow: TrackWindow;
  segmentDrawing:SegmentDrawing;

  constructor(private segmentService: SegmentService) {
    this.trackWindow = new TrackWindow();
    this.segments = [];
  }
  getSegments(): void {
    this.segmentService.getSegmentsRest().then(
        (val) => {
          this.segments = val;
          this.segmentDrawing = new SegmentDrawing(this.segmentComponent, this.segments);
          this.segmentDrawing.drawSegments();
        },
        (err) => console.error(err)
      );
  }


  ngOnInit(): void {
    this.segmentComponent.setTrackWindow(this.trackWindow);
    this.getSegments();
  }

  handleZoomChange(event: number): void {
    this.trackWindow.setZoom(event);
    this.segmentComponent.clearSegments();
    this.segmentDrawing.drawSegments();
  }

  handleTimeChange(event: number): void {
    console.log('time');
  }

}
