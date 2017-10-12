import { Injectable } from '@angular/core';
import { Segment } from './segment'
import { SEGMENTS } from './mockSegment'

@Injectable()
export class SegmentService {
  getSegments(): Promise<Segment[]> {
    return Promise.resolve(SEGMENTS);
  }
}
