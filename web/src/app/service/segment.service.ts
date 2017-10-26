import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Segment } from '../model/segment';

@Injectable()
export class SegmentService {

  constructor(private _http: Http) {
  }

  getSegmentsRest(): Promise<Segment[]> {
    return new Promise((resolve, reject) => {
      this._http.get('http://localhost:8080/segments')
                  .map((res: Response) => res.json())
                   .subscribe(data => {
                          resolve(Segment.createSegments(data));
                        });
    });
  }

}
