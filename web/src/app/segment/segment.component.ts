import { Component, ElementRef, ViewChild} from '@angular/core';
import { TrackWindow } from '../model/track.window';
import { CanvasPoint } from '../model/canvas.point';
import { Line } from '../model/line';

@Component({
  selector: 'segment',
  templateUrl: './segment.component.html'
})
export class SegmentComponent {

    @ViewChild('myCanvas') canvasRef: ElementRef;
    trackWindow: TrackWindow;

    constructor() {}

    drawLines(lines:Line[]):void{
      for(let line of lines){
        this.drawSegLine(line.start, line.end, line.color);
      }
    }

    getCtx(): CanvasRenderingContext2D {
      return this.canvasRef.nativeElement.getContext('2d');
    }

    drawSegLine(a: CanvasPoint, b: CanvasPoint, color: string): void {
      const ctx: CanvasRenderingContext2D = this.getCtx();
      ctx.beginPath();
      ctx.lineWidth = 5;
      ctx.strokeStyle = color;
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
    clearSegments(): void {
      const ctx: CanvasRenderingContext2D = this.getCtx();
      ctx.clearRect(0, 0, this.trackWindow.canvasWidth, this.trackWindow.canvasHeight);
    }

}
