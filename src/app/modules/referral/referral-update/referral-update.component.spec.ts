import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralUpdateComponent } from './referral-update.component';

describe('ReferralUpdateComponent', () => {
  let component: ReferralUpdateComponent;
  let fixture: ComponentFixture<ReferralUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferralUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
