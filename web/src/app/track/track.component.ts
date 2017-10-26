import { Component, OnInit, ViewChild } from '@angular/core';
import { SegmentComponent } from '../segment/segment.component';
import { TrackWindow } from '../model/track.window';
import { SegmentService } from '../service/segment.service';
import { SegmentDrawing } from '../util/segment.drawing';

@Component({
  selector: 'track',
  templateUrl: './track.component.html',
  providers: [SegmentService]
})
export class TrackComponent implements OnInit  {

  @ViewChild(SegmentComponent)
  private segmentComponent: SegmentComponent;

  trackWindow: TrackWindow;
  segmentDrawing:SegmentDrawing;

  constructor(private segmentService: SegmentService) {
    this.trackWindow = new TrackWindow();
  }
  getSegments(): void {
    this.segmentService.getSegmentsRest().then(
        (val) => {
          this.segmentDrawing = new SegmentDrawing(this.segmentComponent, val);
          this.segmentDrawing.drawSegments();
        },
        (err) => console.error(err)
      );
  }


  ngOnInit(): void {
    this.segmentComponent.trackWindow = this.trackWindow;
    this.getSegments();
  }

  handleZoomChange(event: number): void {
    this.trackWindow.setZoom(event);
    this.segmentDrawing.drawSegments();
  }

  handleTimeChange(event: number): void {
    console.log('time');
  }

}
