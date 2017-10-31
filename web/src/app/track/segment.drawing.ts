
import { SegmentComponent } from '../segment/segment.component';
import { Segment } from '../model/segment';
import { TrackWindow } from '../model/track.window';
import { SpeedMath } from '../util/speed.math';
import { CanvasMath } from '../util/canvas.math';
import { Borders } from '../model/borders';
import { CanvasPoint } from '../model/canvas.point';
import { SpeedStats } from './speed.stats';


export class SegmentDrawing{

    trackWindow: TrackWindow;
    speedStats = new SpeedStats();

    constructor(private segmentComponent:SegmentComponent, private segments:Segment[]) {
      this.trackWindow = segmentComponent.trackWindow;
      this.setupCanvas();
      this.speedStats.setDefaultSpeed();
    }

    drawSegments(): void {
      if (this.segments.length === 0) {
        return;
      }
      this.segmentComponent.clearSegments();

      this.speedStats.setMaxSpeed(this.segments);

      let i = 1;
      while (i < this.segments.length) {
        this.drawSegment(this.segments[i-1], this.segments[i]);
        i++;
      }
    }

    drawSegment(seg: Segment, nextSeg: Segment): void {

      const canvasMath = new CanvasMath();
      const color = this.speedStats.speedColor(seg, nextSeg);

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
