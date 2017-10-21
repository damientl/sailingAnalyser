import { CanvasPoint } from '../model/canvas.point';
import { TrackWindow } from '../model/track.window';
import { Segment } from '../model/segment';
import { DateUtil } from '../util/date.util';

const MAXSPEED = 20;
const MINSPEED = 5;
const MSTOKNOT = 1.94384;

export class SpeedMath {

  maxSpeed = MAXSPEED;
  minSpeed = MINSPEED;


  speedColor(a: Segment, b: Segment): string {
    const dateUtil = new DateUtil();
    const difTime = dateUtil.difTime(dateUtil.toJSDate(a.time), dateUtil.toJSDate(b.time));

    return  this.perc2color(this.percSpeed(this.speed(a.segToPoint(), b.segToPoint(), difTime)));
  }

  speed(a: CanvasPoint, b: CanvasPoint, miliseconds: number): number {
    return ((this.measure(a.x, a.y, b.x, b.y) * 1000) / miliseconds) * MSTOKNOT;
  }

  percSpeed(speed: number): number {
    return ((speed - this.minSpeed) / this.maxSpeed) * 100;
  }
  perc2color(perc): string {
    if(perc > 100){
      perc = 0;
    } else {
      perc = 100-perc;
    }

    let r, g, b = 0;
    if(perc < 50) {
      r = 255;
      g = Math.round(5.1 * perc);
    }	else {
      g = 255;
      r = Math.round(510 - 5.10 * perc);
    }
    let h = r * 0x10000 + g * 0x100 + b * 0x1;
    return '#' + ('000000' + h.toString(16)).slice(-6);
  }
  measure(lon1, lat1, lon2, lat2):number{  // generally used geo measurement function
    let R = 6378.137; // Radius of earth in KM
    let dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    let dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c;
    return d * 1000; // meters
  }

}
