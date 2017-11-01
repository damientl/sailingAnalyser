import { CanvasPoint } from '../model/canvas.point';
import { TrackWindow } from '../model/track.window';
import { Segment } from '../model/segment';
import { DateUtil } from '../util/date.util';
import { SpeedMath } from '../util/speed.math';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

const MAXSPEED = 21;

export class SpeedStats{
  maxSpeedSubject:Subject<number> = new Subject<number>();
  maxSpeed:number;
  getMaxSpeed():number{
    return this.maxSpeed;
  }
  observeMaxSpeed():Observable<number>{
    return this.maxSpeedSubject.asObservable();
  }
  setDefaultSpeed(){
    this.maxSpeed = MAXSPEED;
  }

  speedColor(a: Segment, b: Segment): string {
    const percSpeed = SpeedMath.percSpeed(
      this.speedKnot(a, b),
      this.maxSpeed);

    SpeedMath.checkSpeedColor(percSpeed, a, b);

    return  SpeedMath.perc2color(percSpeed);
  }
  setMaxSpeed(segments:Segment[]):void{
    this.maxSpeed = 0;
    let i = 1;
    while (i < segments.length) {
      const knot = this.speedKnot(segments[i-1], segments[i]);
      if(knot > this.maxSpeed){
        this.maxSpeed = knot;
      }
      i++;
    }
    this.maxSpeedSubject.next(this.maxSpeed);
  }
  speedKnot(a: Segment, b: Segment): number {
    const difTime = DateUtil.difTime(DateUtil.toJSDate(a.time), DateUtil.toJSDate(b.time));
    return SpeedMath.speed(a.segToPoint(), b.segToPoint(), difTime);
  }
}
