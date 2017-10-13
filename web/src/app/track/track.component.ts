import { Component } from '@angular/core';
import { SegmentService } from '../service/segment.service'

@Component({
  selector: 'track',
  templateUrl: './track.component.html',
  providers: [SegmentService]
})
export class TrackComponent {

  constructor(private segmentService: SegmentService) {
  }

  handleZoomChange(event:number):void{
    this.segmentService.zoomChange(event);
  }
  handleTimeChange(event:number):void{
    this.segmentService.timeChange(event);
  }
}
