import { Component, Input } from '@angular/core';
import { TrackComponent } from './track.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Analise do velejo';
  @Input() vento: Vento = {
    angulo: 0,
    forca: 12
  };
  @Input() corrente: Corrente = {
    angulo: 0,
    forca: 0
  };
}

export class Vento {
  angulo: number;
  forca: number;
}

export class Corrente {
  angulo: number;
  forca: number;
}
