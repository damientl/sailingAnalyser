import { Segment } from '../model/segment';
import { TrackWindow } from '../model/track.window';
import { CanvasPoint } from '../model/canvas.point';
import {Option, option, some, none} from 'ts-option';
import { DateUtil } from '../util/date.util';

export class WindowCenter{
  constructor(private segs:Segment[]){
  }
  static totalTime(a:Date, b:Date):number{
    return DateUtil.difTime(a,b);
  }
  static percTime(date:Date, perc:number, total:number){
    const offset = total * (perc/100);
    return new Date(date.getTime() + offset);
  }
  centerOnTime(time:number):Option<CanvasPoint>{
    if(this.segs.length === 0){
      return option(null);
    }
    const initialTime = new Date(this.segs[0].time);
    const finalTime =  new Date(this.segs[this.segs.length-1].time);
    const percentTime = WindowCenter.percTime(initialTime, time, WindowCenter.totalTime(initialTime,finalTime));
    return option( this.findClosestTime(percentTime).segToPoint());
  }

  findClosestTime(percentTime:Date):Segment{
    let maxDif = Date.now();
    let closestSeg:Segment = this.segs[0];
    for(const seg of this.segs){
      const dif = Math.abs(DateUtil.difTime(new Date(seg.time), percentTime));
      if(dif < maxDif){
        closestSeg = seg;
        maxDif = dif;
      }
    }
    return closestSeg;
  }
}
