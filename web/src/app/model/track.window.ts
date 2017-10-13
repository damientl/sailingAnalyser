import { CanvasPoint } from './canvas.point';

const DEFAULT_ZOOM = 0.0008;

export class TrackWindow{
  canvasWidth:number = 500;
  canvasHeight:number = 500;
  center = new CanvasPoint(-52.218495, -31.774108);//lon, lat - x, y
  lonZoom:number;
  iniZoom:number = DEFAULT_ZOOM;

  constructor() {
    this.setZoom(50);
  }

  getLatZoom():number{
    return this.lonZoom * (this.canvasHeight / this.canvasWidth);
  }

  getLonZoom():number{
    return this.lonZoom;
  }
  setZoom(number):void{
    this.lonZoom = this.iniZoom * (number / 100);
  }
}