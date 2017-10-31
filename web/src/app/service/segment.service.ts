import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Segment } from '../model/segment';
import { SegmentDTO } from '../model/segment.dto';

@Injectable()
export class SegmentService {

  constructor(private _http: HttpClient) {
  }

  getSegmentsRest(): Promise<Segment[]> {
    return new Promise((resolve, reject) => {
      this._http.get<SegmentDTO>('http://localhost:8080/segments')
                   .subscribe(
                  data => {
                          resolve(Segment.createSegments(data.segments));
                        },
                  (err: HttpErrorResponse) => this.errorHandler(err, reject));
    });
  }

  errorHandler(err:HttpErrorResponse, reject):void{
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(`Backend returned code ${err.status}, body was: ${err.error + JSON.stringify(err.error)}`);
    }
    reject('Could not get segments from server!');
  }

}
