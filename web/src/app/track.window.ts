import { CanvasPoint } from './canvas.point';

export class TrackWindow{
  canvasWidth = 500;
  canvasHeight = 500;
  center = new CanvasPoint(-31.773908, -52.218495);
  lonZoom = 0.001;

  getLatZoom():number{
    return this.lonZoom * (this.canvasHeight / this.canvasWidth);
  }

  getLonZoom():number{
    return this.lonZoom;
  }
}
