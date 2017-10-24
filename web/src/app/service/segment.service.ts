import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Segment } from '../model/segment';
import { SEGMENTS } from '../mock.segment';

@Injectable()
export class SegmentService {

  constructor(private _http: Http) {
  }

  createSegments(segs): Segment[] {
    const segArr: Segment[] = [];
    for (const s of segs){
      segArr.push(new Segment(s['lat'], s['lon'], s['time']));
    }
    return segArr;
  }

  getSegments(): Promise<Segment[]> {
    return Promise.resolve(this.createSegments(SEGMENTS));
  }

  getSegmentsRest(): Promise<Segment[]> {
    return new Promise((resolve, reject) => {
      this._http.get('http://localhost:8080/segments')
                  .map((res: Response) => res.json())
                   .subscribe(data => {
                          console.log(`data: ${data}`);
                          console.log('this.createSegments: ' + this.createSegments(data));
                          resolve(this.createSegments(data));
                        });
    });
  }
}
