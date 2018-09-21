import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SailingAnalyzerComponent } from './sailing-analyzer.component';

describe('SailingAnalyzerComponent', () => {
  let component: SailingAnalyzerComponent;
  let fixture: ComponentFixture<SailingAnalyzerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SailingAnalyzerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SailingAnalyzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
