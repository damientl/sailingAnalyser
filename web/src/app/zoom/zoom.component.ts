import { Component } from '@angular/core';

@Component({
  selector: 'zoom',
  templateUrl: './zoom.component.html'
})
export class ZoomComponent {
  value;
 valueLtr
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

 constructor() {
   this.minValue = 0;
   this.maxValue = 100;
   this.initilalValue = 50;
   this.value = this.initilalValue;
   this.valueLtr = this.initilalValue;
   this.primaryColor = 'blue';
   this.secondaryColor = 'orange';
   this.lineWidth = 7;
   this.circleColor = 'pink';
   this.circleSize = 8;
   this.toggleDisable = 'enable'
   this.toggleDisableText = 'disable'
 }
 selectedValue(iSelectedValue){
   this.value = iSelectedValue
 }

}
