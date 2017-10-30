import { Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import { SpeedMath } from '../util/speed.math';


@Component({
  selector: 'scale',
  templateUrl: './color.scale.component.html'
})

export class ColorScaleComponent implements OnInit  {

    @ViewChild('colorCanvas') canvasRef: ElementRef;

    constructor() {
    }

    ngOnInit(): void {
      this.drawScaleLine();
    }

    getCtx(): CanvasRenderingContext2D {
      return this.canvasRef.nativeElement.getContext('2d');
    }

    drawScaleLine(): void {
      const ctx: CanvasRenderingContext2D = this.getCtx();
      let i = -50;
      while(i<120){
        this.drawLine(i,ctx);
        i++;
      }
    }
    drawLine(i, ctx):void{
      ctx.beginPath();
      ctx.lineWidth = 20;
      ctx.strokeStyle = SpeedMath.perc2color(i);
      ctx.moveTo(50+i*2, 10);
      ctx.lineTo(50+(i+1)*2, 10);
      ctx.stroke();
    }
}
