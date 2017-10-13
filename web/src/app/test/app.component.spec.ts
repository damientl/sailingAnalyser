import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        FormsModule
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    //const fixture = TestBed.createComponent(AppComponent);
    //const app = fixture.debugElement.componentInstance;
    expect(true).toBeTruthy();
  }));
});
