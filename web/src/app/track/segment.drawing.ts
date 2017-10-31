
import { SegmentComponent } from '../segment/segment.component';
import { Segment } from '../model/segment';
import { TrackWindow } from '../model/track.window';
import { SpeedMath } from '../util/speed.math';
import { CanvasMath } from '../util/canvas.math';
import { Borders } from '../model/borders';
import { CanvasPoint } from '../model/canvas.point';

export class SegmentDrawing{

    trackWindow: TrackWindow;

    constructor(private segmentComponent:SegmentComponent, private segments:Segment[]) {
      this.trackWindow = segmentComponent.trackWindow;
      this.setupCanvas();
    }

    drawSegments(): void {
      if (this.segments.length === 0) {
        return;
      }
      this.segmentComponent.clearSegments();

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
      const color = SpeedMath.speedColor(seg, nextSeg);

      this.segmentComponent.drawSegLine(canvasMath.pointOnCanvas(seg.segToPoint(), this.trackWindow),
                      canvasMath.pointOnCanvas(nextSeg.segToPoint(), this.trackWindow)
                      , color);
    }
    setupCanvas():void{
      const canvasMath = new CanvasMath();
      const borders:Borders = canvasMath.findBorders(this.segments);
      this.trackWindow.setIniZoom(canvasMath.findBiggestDistanceSegments(borders));
      this.trackWindow.center = canvasMath.findCenterPoint(borders);
    }
    getTrackCenter():CanvasPoint{
      const canvasMath = new CanvasMath();
      const borders:Borders = canvasMath.findBorders(this.segments);
      return canvasMath.findCenterPoint(borders);
    }
}
