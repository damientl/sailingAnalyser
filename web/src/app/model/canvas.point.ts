export class CanvasPoint {
  constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
  x: number;
  y: number;

  equals(point:CanvasPoint):boolean {
    if(point === undefined || point === null){
      return false;
    }
    return this.x === point.x && this.y === point.y;
  }
}
