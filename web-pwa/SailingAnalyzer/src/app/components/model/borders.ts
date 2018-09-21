import { CanvasPoint } from '../model/canvas.point';

export class Borders {
  min: CanvasPoint;
  max: CanvasPoint;
  constructor(min:CanvasPoint, max:CanvasPoint) {
    this.min = min;
    this.max = max;
  }
}
