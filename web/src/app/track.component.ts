import { Component } from '@angular/core';
import { SegmentService } from './segment.service'
import { OnInit } from '@angular/core';
import { Segment } from './segment';

@Component({
  selector: 'track',
  templateUrl: './track.component.html',
  providers: [SegmentService]
})
export class TrackComponent  implements OnInit {
  segments:Segment[]
  constructor(private segmentService: SegmentService) { }

  getSegments():void {
    this.segmentService.getSegments().then(segments => this.segments = segments);
  }

  ngOnInit(): void {
    this.getSegments();
  }
}
