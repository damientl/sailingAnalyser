import { Segment } from '../model/segment';
import { TrackWindow } from '../model/track.window';
import { CanvasPoint } from '../model/canvas.point';
import {Option, option, some, none} from 'ts-option';


export class WindowCenter{
  constructor(private trackWindow:TrackWindow, private segs:Segment[]){
  }
  centerOnTime(time:number):Option<CanvasPoint>{
    if(this.segs.length === 0){
      return option(null);
    }
    const initialTime = new Date(this.segs[0].time);
    const finalTime =  new Date(this.segs[this.segs.length-1].time);
    const percentTime = this.percTime(initialTime, time, this.totalTime(initialTime,finalTime));
    return option( this.findClosestTime(percentTime).segToPoint());
  }

  findClosestTime(percentTime:Date):Segment{
    let maxDif = Date.now();
    let closestSeg:Segment = this.segs[0];
    for(const seg of this.segs){
      const dif = this.difTime(new Date(seg.time), percentTime);
      if(dif < maxDif){
        closestSeg = seg;
        maxDif = dif;
      }
    }
    return closestSeg;
  }
  difTime(a:Date,b:Date):number{
    return b.getMilliseconds() - a.getMilliseconds();
  }
  totalTime(a:Date, b:Date):number{
    return this.difTime(a,b);
  }
  percTime(date:Date, perc:number, total:number){
    const offset = total * (perc/100);
    return new Date(date.getMilliseconds() + offset);
  }
}
