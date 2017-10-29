import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { D3SliderDirective } from 'ng-d3-slider/d3-slider.directive';
import { AppComponent } from './app.component';
import { TrackComponent } from './track/track.component';
import { ZoomComponent } from './zoom/zoom.component';
import { TimeComponent } from './time/time.component';
import { SegmentComponent } from './segment/segment.component';
import { ColorScaleComponent } from './colorsscale/color.scale.component';

@NgModule({
  declarations: [
    D3SliderDirective,
    AppComponent,
    TrackComponent,
    ZoomComponent,
    TimeComponent,
    ColorScaleComponent,
    SegmentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
