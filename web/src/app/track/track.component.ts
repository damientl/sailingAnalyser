import { Component } from '@angular/core';
import { SegmentService } from '../service/segment.service'
import { OnInit, ElementRef, ViewChild} from '@angular/core';
import { Segment } from '../model/segment';
import { TrackWindow } from '../model/track.window';
import { CanvasPoint } from '../model/canvas.point';
import { SpeedMath } from '../util/speed.math';
import { CanvasMath } from '../util/canvas.math';
import { DateUtil } from '../util/date.util';

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

    let i = 1;
    for (let seg of this.segments) {
      this.drawSegment(seg, ctx, i);
      i++;
    }
  }

  drawSegment(seg:Segment, ctx, i):void{
    if(i >= this.segments.length){
      return;
    }

    let canvasMath = new CanvasMath();
    let speedMath = new SpeedMath();
    let dateUtil = new DateUtil();
    let segPoint = new CanvasPoint(seg.lon,seg.lat);
    let point = canvasMath.pointOnCanvas(segPoint, this.trackWindow);

    let nextSeg = this.segments[i];
    let nextSegPoint =  new CanvasPoint(nextSeg.lon,nextSeg.lat);
    let nextPoint = canvasMath.pointOnCanvas(nextSegPoint, this.trackWindow);
    let difTime = dateUtil.difTime(dateUtil.toJSDate(seg.time), dateUtil.toJSDate(nextSeg.time));

    ctx.beginPath();
    ctx.lineWidth=5;
    ctx.strokeStyle = speedMath.perc2color(speedMath.percSpeed(speedMath.speed(segPoint, nextSegPoint, difTime)));
    ctx.moveTo(point.x, point.y);
    ctx.lineTo(nextPoint.x, nextPoint.y);
    ctx.stroke();
  }

  clearSegments():void {
    let ctx: CanvasRenderingContext2D =
    this.canvasRef.nativeElement.getContext('2d');
    ctx.clearRect(0, 0, this.trackWindow.canvasWidth, this.trackWindow.canvasHeight);
  }

  handleZoomChange(event:number):void{
    this.trackWindow.setZoom(event);
    this.clearSegments();
    this.drawSegments();
  }
  handleTimeChange(event:number):void{
    console.log('time');
  }
}
