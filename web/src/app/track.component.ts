import { Component } from '@angular/core';
import { SegmentService } from './segment.service'
import { OnInit, ElementRef, ViewChild} from '@angular/core';
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
  trackWindow:TrackWindow;

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
      this.drawSegment(seg, ctx, i==1);
      i++;
    }
    ctx.stroke();
  }
  
  drawSegment(seg, ctx, first):void{
    let point = new Calculation().pointOnCanvas(new CanvasPoint(seg.lon,seg.lat), this.trackWindow);

    if(first){
      ctx.moveTo(point.x, point.y);
    } else {
      ctx.lineTo(point.x, point.y);
    }
  }

  clearSegments():void {
    let ctx: CanvasRenderingContext2D =
    this.canvasRef.nativeElement.getContext('2d');
    ctx.clearRect(0, 0, this.trackWindow.canvasWidth, this.trackWindow.canvasHeight);
  }

  handleZoomChange():void{
    this.clearSegments();
    this.drawSegments();
  }
}
