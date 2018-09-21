import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SailingAnalyzerComponent } from './components/sailing-analyzer/sailing-analyzer.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TrackComponent } from './components/track/track.component';
import { ZoomComponent } from './components/zoom/zoom.component';
import { TimeComponent } from './components/time/time.component';
import { ColorScaleComponent } from './components/colorsscale/color.scale.component';
import { SegmentComponent } from './components/segment/segment.component';
import { GpsRecordComponent } from './components/gpsrecord/gpsrecord.component';

@NgModule({
  declarations: [
    AppComponent,
    SailingAnalyzerComponent,
    TrackComponent,
    ZoomComponent,
    TimeComponent,
    ColorScaleComponent,
    SegmentComponent,
    GpsRecordComponent,
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
