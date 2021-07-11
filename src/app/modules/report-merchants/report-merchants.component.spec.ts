import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportMerchantsComponent } from './report-merchants.component';

describe('ReportMerchantsComponent', () => {
  let component: ReportMerchantsComponent;
  let fixture: ComponentFixture<ReportMerchantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportMerchantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportMerchantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
