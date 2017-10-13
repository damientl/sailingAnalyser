import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { D3SliderDirective } from 'ng-d3-slider/d3-slider.directive';
import { AppComponent } from './app.component';
import { TrackComponent } from './track/track.component';
import { ZoomComponent } from './zoom/zoom.component';
import { TimeComponent } from './time/time.component';

@NgModule({
  declarations: [
    D3SliderDirective,
    AppComponent,
    TrackComponent,
    ZoomComponent,
    TimeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
