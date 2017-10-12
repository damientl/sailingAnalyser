import { CanvasPoint } from './canvas.point';
import { TrackWindow } from './track.window';

export class Calculation{
  distance(x1,y1,x2,y2):number {
    var a = x1 - x2
    var b = y1 - y2

    return Math.sqrt( a*a + b*b );
  }
  perc2color(perc):string {
  	var r, g, b = 0;
  	if(perc < 50) {
  		r = 255;
  		g = Math.round(5.1 * perc);
  	}
  	else {
  		g = 255;
  		r = Math.round(510 - 5.10 * perc);
  	}
  	var h = r * 0x10000 + g * 0x100 + b * 0x1;
  	return '#' + ('000000' + h.toString(16)).slice(-6);
  }

  pointOnCanvas(gpsPoint:CanvasPoint, trackWindow:TrackWindow):CanvasPoint{
    let center = trackWindow.center;
    let canvasCenter = new CanvasPoint(trackWindow.canvasWidth / 2, trackWindow.canvasHeight / 2);

    return this.sumPoints(canvasCenter, this.transformToCanvas(this.centerOffset(gpsPoint, center), trackWindow));
  }
  transformToCanvas(offset:CanvasPoint, trackWindow:TrackWindow):CanvasPoint{
    return new CanvasPoint(
      (offset.x / trackWindow.getLonZoom()) * (trackWindow.canvasWidth / 2),
      (offset.y / trackWindow.getLatZoom()) * (trackWindow.canvasHeight / 2));
  }
  centerOffset(gpsPoint:CanvasPoint, center):CanvasPoint {
    return new CanvasPoint(gpsPoint.x - center.x, gpsPoint.y - center.y);
  }
  sumPoints(a:CanvasPoint, b:CanvasPoint):CanvasPoint{
     return new CanvasPoint(a.x + b.x, b.y + a.y);
  }
}
