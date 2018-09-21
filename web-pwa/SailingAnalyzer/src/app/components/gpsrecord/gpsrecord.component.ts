import { Component, OnInit, Output , EventEmitter } from '@angular/core';
import { XmlParser } from './xmlparser';

@Component({
  selector: 'gpsrecord',
  templateUrl: './gpsrecord.component.html',
  providers: []
})
export class GpsRecordComponent implements OnInit {

  @Output()
  changeValue: EventEmitter<any> = new EventEmitter<any>();

  file;

    ngOnInit(): void {
    }

    onChange(event){
      this.file = event.target.files[0];
    }

    onSubmit() {
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        const segments = new XmlParser().parseRecord(fileReader.result);
        this.changeValue.emit(segments);
      };
      fileReader.readAsText(this.file);
    }
}
