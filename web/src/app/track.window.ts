import { CanvasPoint } from './canvas.point';
import { Input } from '@angular/core';

export class TrackWindow{
  canvasWidth = 500;
  canvasHeight = 500;
  center = new CanvasPoint(-52.218495, -31.773908);//lon, lat - x, y
  @Input() lonZoom = 0.0002;

  getLatZoom():number{
    return this.lonZoom * (this.canvasHeight / this.canvasWidth);
  }

  getLonZoom():number{
    return this.lonZoom;
  }
}
