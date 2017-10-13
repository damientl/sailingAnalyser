import { Component, ViewChild } from '@angular/core';
import { SegmentComponent } from '../segment/segment.component';

@Component({
  selector: 'track',
  templateUrl: './track.component.html'
})
export class TrackComponent {

  @ViewChild(SegmentComponent)
  private segmentComponent: SegmentComponent;

  handleZoomChange(event:number):void{
    this.segmentComponent.handleZoomChange(event);
  }
  handleTimeChange(event:number):void{
    this.segmentComponent.handleTimeChange(event);
  }
}
