import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { SegmentService } from '../service/segment.service';
import { Segment } from '../model/segment';
import { TrackWindow } from '../model/track.window';
import { CanvasPoint } from '../model/canvas.point';
import { SpeedMath } from '../util/speed.math';
import { CanvasMath } from '../util/canvas.math';
import { DateUtil } from '../util/date.util';

@Component({
  selector: 'segment',
  templateUrl: './segment.component.html',
  providers: [SegmentService]
})
export class SegmentComponent implements OnInit  {

    @ViewChild('myCanvas') canvasRef: ElementRef;
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

      this.drawSegLine(canvasMath.pointOnCanvas(seg.segToPoint(), this.trackWindow),
                      canvasMath.pointOnCanvas(nextSeg.segToPoint(), this.trackWindow)
                      , color);
    }

    getCtx(): CanvasRenderingContext2D {
      return this.canvasRef.nativeElement.getContext('2d');
    }

    drawSegLine(a: CanvasPoint, b: CanvasPoint, color: string): void {
      const ctx: CanvasRenderingContext2D = this.getCtx();
      ctx.beginPath();
      ctx.lineWidth = 5;
      ctx.strokeStyle = color;
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }

    clearSegments(): void {
      const ctx: CanvasRenderingContext2D = this.getCtx();
      ctx.clearRect(0, 0, this.trackWindow.canvasWidth, this.trackWindow.canvasHeight);
    }

    getSegments(): void {
      this.segmentService.getSegments().then(segments => {
        this.segments = segments;
        this.drawSegments();
      });
    }

    ngOnInit(): void {
      this.getSegments();
    }

    handleZoomChange(event: number): void {
      this.trackWindow.setZoom(event);
      this.clearSegments();
      this.drawSegments();
    }

    handleTimeChange(event: number): void {
      console.log('time');
    }

}
