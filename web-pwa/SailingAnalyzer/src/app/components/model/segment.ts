import { CanvasPoint } from '../model/canvas.point';

export class Segment {
  lat: number;
  lon: number;
  time: string;

  static createSegments (segs): Segment[] {
    const segArr: Segment[] = [];
    for (const s of segs){
      segArr.push(new Segment(s['lat'], s['lon'], s['time']));
    }
    return segArr;
  }

  constructor(lat, lon, time) {
    this.lat = lat;
    this.lon = lon;
    this.time = time;
  }
  segToPoint(): CanvasPoint {
    return new CanvasPoint(this.lon, this.lat);
  }

}
