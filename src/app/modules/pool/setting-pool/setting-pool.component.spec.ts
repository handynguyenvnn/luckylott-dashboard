import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingPoolComponent } from './setting-pool.component';

describe('SettingPoolComponent', () => {
  let component: SettingPoolComponent;
  let fixture: ComponentFixture<SettingPoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingPoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
