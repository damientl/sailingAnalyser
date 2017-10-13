import { Injectable } from '@angular/core';
import { Segment } from '../model/segment'
import { SEGMENTS } from '../mock.segment'

@Injectable()
export class SegmentService {
  getSegments(): Promise<Segment[]> {
    return Promise.resolve(SEGMENTS);
  }

  zoomChange(event):void{

  }
  timeChange(event):void{

  }
}
