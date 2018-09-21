import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sailing-analyzer',
  templateUrl: './sailing-analyzer.component.html',
  styleUrls: ['./sailing-analyzer.component.css']
})
export class SailingAnalyzerComponent implements OnInit {

  title = 'Analise do velejo';
  vento: Vento = {
    angulo: 0,
    forca: 12
  };
  corrente: Corrente = {
    angulo: 0,
    forca: 0
  };

  segmentsLoad: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onLoadGpsRecord(event) {
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
