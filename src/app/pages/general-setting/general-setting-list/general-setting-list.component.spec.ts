import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralSettingListComponent } from './general-setting-list.component';

describe('GeneralSettingListComponent', () => {
  let component: GeneralSettingListComponent;
  let fixture: ComponentFixture<GeneralSettingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralSettingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralSettingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
