import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizeSettingComponent } from './prize-setting.component';

describe('PrizeSettingComponent', () => {
  let component: PrizeSettingComponent;
  let fixture: ComponentFixture<PrizeSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrizeSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrizeSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
