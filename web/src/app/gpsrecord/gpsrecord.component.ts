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
      console.log('event', event);
      this.file = event.target.files[0];
    }

    onSubmit() {
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        console.log(fileReader.result);
        const segments = new XmlParser().parseRecord(fileReader.result);
        console.log('segments', segments);

        this.changeValue.emit(segments);
      };
      fileReader.readAsText(this.file);
    }
}
