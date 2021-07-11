import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportBetsComponent } from './report-bets.component';

describe('ReportBetsComponent', () => {
  let component: ReportBetsComponent;
  let fixture: ComponentFixture<ReportBetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportBetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportBetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
