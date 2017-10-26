import { Component, OnInit, ViewChild } from '@angular/core';
import { SegmentComponent } from '../segment/segment.component';
import { SegmentService } from '../service/segment.service';
import { Segment } from '../model/segment';
import { TrackWindow } from '../model/track.window';
import { CanvasPoint } from '../model/canvas.point';
import { SpeedMath } from '../util/speed.math';
import { CanvasMath } from '../util/canvas.math';
import { DateUtil } from '../util/date.util';
import { Borders } from '../model/borders';

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

  constructor(private segmentService: SegmentService) {
    this.trackWindow = new TrackWindow();
    this.segments = [];
  }

  drawSegments(): void {
    if (this.segments.length === 0) {
      return;
    }

    let i = 1;
    for (const seg of this.segments) {
      this.drawSegment(seg, i);
      i++;
    }
  }

  drawSegment(seg: Segment, i): void {
    if (i >= this.segments.length) {
      return;
    }

    const canvasMath = new CanvasMath();
    const nextSeg: Segment = this.segments[i];
    const speedMath = new SpeedMath();

    const color = speedMath.speedColor(seg, nextSeg);

    this.segmentComponent.drawSegLine(canvasMath.pointOnCanvas(seg.segToPoint(), this.trackWindow),
                    canvasMath.pointOnCanvas(nextSeg.segToPoint(), this.trackWindow)
                    , color);
  }
  getSegments(): void {
    this.segmentService.getSegmentsRest().then(
        (val) => {
          this.segments = val;
          this.setupCanvas();
          this.drawSegments();
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
    this.drawSegments();
  }

  handleTimeChange(event: number): void {
    console.log('time');
  }

  setupCanvas():void{
    const canvasMath = new CanvasMath();
    const borders:Borders = canvasMath.findBorders(this.segments);
    this.trackWindow.setIniZoom(canvasMath.findBiggestDistanceSegments(borders));
    this.trackWindow.setCenter(canvasMath.findCenterPoint(borders));
  }
}
