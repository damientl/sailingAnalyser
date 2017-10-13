import { CanvasPoint } from '../model/canvas.point';
import { TrackWindow } from '../model/track.window';

export class CanvasMath{

    pointOnCanvas(gpsPoint:CanvasPoint, trackWindow:TrackWindow):CanvasPoint{
      let center = trackWindow.center;
      let canvasCenter = new CanvasPoint(trackWindow.canvasWidth / 2, trackWindow.canvasHeight / 2);

      return this.sumPoints(canvasCenter, this.transformToCanvas(this.centerOffset(gpsPoint, center), trackWindow));
    }
    transformToCanvas(offset:CanvasPoint, trackWindow:TrackWindow):CanvasPoint{
      return new CanvasPoint(
        (offset.x / trackWindow.getLonZoom()) * (trackWindow.canvasWidth / 2),
        (-offset.y / trackWindow.getLatZoom()) * (trackWindow.canvasHeight / 2));
    }
    centerOffset(gpsPoint:CanvasPoint, center):CanvasPoint {
      return new CanvasPoint(gpsPoint.x - center.x, gpsPoint.y - center.y);
    }
    sumPoints(a:CanvasPoint, b:CanvasPoint):CanvasPoint{
       return new CanvasPoint(a.x + b.x, a.y + b.y);
    }
}
