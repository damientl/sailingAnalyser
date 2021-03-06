import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'zoom',
  templateUrl: './zoom.component.html'
})
export class ZoomComponent {

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


  constructor() {
    this.minValue = 0;
    this.maxValue = 99;
    this.initilalValue = 50;
    this.value = this.initilalValue;
    this.valueLtr = this.initilalValue;
    this.primaryColor = 'blue';
    this.secondaryColor = 'orange';
    this.lineWidth = 7;
    this.circleColor = 'pink';
    this.circleSize = 8;
    this.toggleDisable = 'enable';
    this.toggleDisableText = 'disable';
 }
 selectedValue(iSelectedValue){
    this.value = iSelectedValue;
    this.changeValue.emit(iSelectedValue);
 }

}
