import { Component, Output, EventEmitter } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';
import { Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'time',
  templateUrl: './time.component.html'
})
export class TimeComponent {
    value;
    valueLtr;
    minValue;
    maxValue;
    initilalValue;
    primaryColor;
    secondaryColor;
    lineWidth;
    circleColor;
    circleSize;
    toggleDisable;
    toggleDisableText;

    @Output()
    changeValue: EventEmitter<number> = new EventEmitter<number>();

    startStop = false;
    subscription: Subscription;
    timer;
    delta;
    speed=50;

    constructor() {
      this.minValue = 0;
      this.maxValue = 100;
      this.initilalValue = 0;
      this.value = this.initilalValue;
      this.valueLtr = this.initilalValue;
      this.primaryColor = 'blue';
      this.secondaryColor = 'orange';
      this.lineWidth = 7;
      this.circleColor = 'pink';
      this.circleSize = 8;
      this.toggleDisable = 'enable';
      this.toggleDisableText = 'disable';

      this.timer = timer(10, 200);

   }

   subscribeTimer(){
     this.subscription = this.timer.subscribe(t => {
           this.updateValue();
           this.changeValue.emit(this.value);
     });
   }

   updateValue() {
        this.value = this.value + (this.delta * (this.speed/100) )/4;
        if(this.value < 0) {
          this.value = 0;
        }
        if(this.value > 100){
          this.value = 100;
        }
   }

   selectedValue(iSelectedValue) {
      this.value = iSelectedValue;
      this.changeValue.emit(iSelectedValue);
   }
   onTimeChange(delta: number) {
     this.delta = delta;

     this.startStop = !this.startStop;

     if(!this.startStop){
       this.subscription.unsubscribe();
     }else{
       this.subscribeTimer();
     }
   }
}
