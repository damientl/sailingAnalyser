
import { Segment } from '../model/segment';
import { TrackWindow } from '../model/track.window';
import { SpeedMath } from '../util/speed.math';
import { CanvasMath } from '../util/canvas.math';
import { Borders } from '../model/borders';
import { CanvasPoint } from '../model/canvas.point';
import { SpeedStats } from './speed.stats';
import { Line } from '../model/line';

export class SegmentDrawing{

    speedStats = new SpeedStats();

    constructor(private trackWindow:TrackWindow, private segments:Segment[]) {
      this.setupCanvas();
      this.speedStats.setDefaultSpeed();
    }

    getSegmentLines(): Line[] {
      if (this.segments.length === 0) {
        return [];
      }
      const lines = [];

      this.speedStats.setMaxSpeed(this.segments);

      let i = 1;
      while (i < this.segments.length) {
        lines.push(this.getLine(this.segments[i-1], this.segments[i]));
        i++;
      }
      return lines;
    }

    getLine(seg: Segment, nextSeg: Segment): Line {

      const canvasMath = new CanvasMath();
      const color = this.speedStats.speedColor(seg, nextSeg);

      return new Line(canvasMath.pointOnCanvas(seg.segToPoint(), this.trackWindow),
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

    getCenterPoint(center: CanvasPoint) {
      const canvasMath = new CanvasMath();
      const borders:Borders = canvasMath.findBorders(this.segments);
      return canvasMath.pointOnCanvas(center, this.trackWindow);
    }
}
