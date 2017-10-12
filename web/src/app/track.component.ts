import { Component } from '@angular/core';
import { SegmentService } from './segment.service'
import { OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Segment } from './segment';
import { TrackWindow } from './track.window';
import { CanvasPoint } from './canvas.point';
import { Calculation } from './calculation';

@Component({
  selector: 'track',
  templateUrl: './track.component.html',
  providers: [SegmentService]
})
export class TrackComponent  implements OnInit {
  @ViewChild('myCanvas') canvasRef: ElementRef;
  segments:Segment[];
  @Input() trackWindow:TrackWindow;

  constructor(private segmentService: SegmentService) {
    this.trackWindow = new TrackWindow();
  }

  getSegments():void {
    this.segmentService.getSegments().then(segments => {
      this.segments = segments;
      this.drawSegments();
    });
  }

  ngOnInit(): void {
    this.getSegments();
  }

  drawSegments(): void {
    let ctx: CanvasRenderingContext2D =
    this.canvasRef.nativeElement.getContext('2d');
    ctx.beginPath();

    let i = 1;
    for (let seg of this.segments) {
      let point = new Calculation().pointOnCanvas(new CanvasPoint(seg.lon,seg.lat), this.trackWindow);

      if(i == 1){
        ctx.moveTo(point.x, point.y);
        console.log(`move point x: ${ point.x }, point y: ${ point.y }.`);
      } else {
        ctx.lineTo(point.x, point.y);
        console.log(`line point x: ${ point.x }, point y: ${ point.y }.`);
      }
      i++;
    }
    ctx.stroke();
  }

  handleZoomChange():void{
      this.drawSegments();
  }
}
