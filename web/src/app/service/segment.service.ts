import { Injectable } from '@angular/core';
import { Segment } from '../model/segment'
import { SEGMENTS } from '../mock.segment'

@Injectable()
export class SegmentService {
  createSegments(segs): Segment[]{
    let segArr:Segment[] = [];
    for(let s of segs){
      segArr.push(new Segment(s["lat"],s["lon"],s["time"]));
    }
    return segArr;
  };
  getSegments(): Promise<Segment[]> {
    return Promise.resolve(this.createSegments(SEGMENTS));
  }
}
