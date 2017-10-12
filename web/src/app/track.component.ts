import { Component } from '@angular/core';
import { SegmentService } from './segment.service'
import { OnInit, ElementRef, ViewChild } from '@angular/core';
import { Segment } from './segment';

@Component({
  selector: 'track',
  templateUrl: './track.component.html',
  providers: [SegmentService]
})
export class TrackComponent  implements OnInit {
  @ViewChild('myCanvas') canvasRef: ElementRef;
  segments:Segment[];

  constructor(private segmentService: SegmentService) {}

  getSegments():void {
    this.segmentService.getSegments().then(segments => this.segments = segments);
  }

  ngOnInit(): void {
    this.getSegments();
    let ctx: CanvasRenderingContext2D =
    this.canvasRef.nativeElement.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(300,150);
    ctx.stroke();

  }
}
