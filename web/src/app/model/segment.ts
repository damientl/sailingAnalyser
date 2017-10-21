import { CanvasPoint } from '../model/canvas.point';

export class Segment {
  lat: number;
  lon: number;
  time: string;
  constructor(lat, lon, time) {
    this.lat = lat;
    this.lon = lon;
    this.time = time;
  }
  segToPoint(): CanvasPoint {
    return new CanvasPoint(this.lon, this.lat);
  }
}
