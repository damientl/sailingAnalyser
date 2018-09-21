import { Component, Input,  EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Analise do velejo';
  vento: Vento = {
    angulo: 0,
    forca: 12
  };
  corrente: Corrente = {
    angulo: 0,
    forca: 0
  };

  segmentsLoad:EventEmitter<any> = new EventEmitter<any>();

  onLoadGpsRecord(event){
    this.segmentsLoad.emit(event);
  }
}

export class Vento {
  angulo: number;
  forca: number;
}

export class Corrente {
  angulo: number;
  forca: number;
}
