import { CanvasPoint } from '../model/canvas.point';
import { TrackWindow } from '../model/track.window';
import { Borders } from '../model/borders';
import { Segment } from '../model/segment';

export class CanvasMath {

    pointOnCanvas(gpsPoint: CanvasPoint, trackWindow: TrackWindow): CanvasPoint {
      const center = trackWindow.center;
      const canvasCenter = new CanvasPoint(trackWindow.canvasWidth / 2, trackWindow.canvasHeight / 2);

      return this.sumPoints(canvasCenter, this.transformToCanvas(this.centerOffset(gpsPoint, center), trackWindow));
    }
    transformToCanvas(offset: CanvasPoint, trackWindow: TrackWindow): CanvasPoint {
      return new CanvasPoint(
        (offset.x / trackWindow.getLonZoom()) * (trackWindow.canvasWidth / 2),
        (-offset.y / trackWindow.getLatZoom()) * (trackWindow.canvasHeight / 2));
    }
    centerOffset(gpsPoint: CanvasPoint, center): CanvasPoint {
      return new CanvasPoint(gpsPoint.x - center.x, gpsPoint.y - center.y);
    }
    sumPoints(a: CanvasPoint, b: CanvasPoint): CanvasPoint {
       return new CanvasPoint(a.x + b.x, a.y + b.y);
    }

    findBiggestDistanceSegments(borders:Borders):number{
      const diffX = borders.max.x - borders.min.x;
      const diffY = borders.max.y - borders.min.y;

      return Math.max(diffX, diffY);
    }
    findCenterPoint(borders:Borders):CanvasPoint{
      let deltaX = (borders.max.x - borders.min.x)/2;
      let deltaY = (borders.max.y - borders.min.y)/2;

      return new CanvasPoint(borders.min.x + deltaX, borders.min.y + deltaY);
    }
    findBorders(segs:Segment[]):Borders{
      let minX, minY, maxX, maxY;
      let i = 0;
      for(const s of segs){
        if(i===0){
          minX = maxX = s.lon;
          minY = maxY= s.lat;
        }
        minX = Math.min(s.lon,minX);
        minY = Math.min(s.lat,minY);
        maxX = Math.max(s.lon,maxX);
        maxY = Math.max(s.lat,maxY);

        i++;
      }
      const min = new CanvasPoint(minX,minY);
      const max = new CanvasPoint(maxX,maxY);
      return new Borders(min,max);
    }
}
