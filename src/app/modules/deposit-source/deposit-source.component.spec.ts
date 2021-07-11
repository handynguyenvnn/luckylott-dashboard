import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositSourceComponent } from './deposit-source.component';

describe('DepositSourceComponent', () => {
  let component: DepositSourceComponent;
  let fixture: ComponentFixture<DepositSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositSourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
