import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPlayersComponent } from './report-players.component';

describe('ReportPlayersComponent', () => {
  let component: ReportPlayersComponent;
  let fixture: ComponentFixture<ReportPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportPlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
