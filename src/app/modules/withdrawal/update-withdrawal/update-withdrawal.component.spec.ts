import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWithdrawalComponent } from './update-withdrawal.component';

describe('UpdateWithdrawalComponent', () => {
  let component: UpdateWithdrawalComponent;
  let fixture: ComponentFixture<UpdateWithdrawalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateWithdrawalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
