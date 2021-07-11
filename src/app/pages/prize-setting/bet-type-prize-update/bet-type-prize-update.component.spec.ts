import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetTypePrizeUpdateComponent } from './bet-type-prize-update.component';

describe('BetTypePrizeUpdateComponent', () => {
  let component: BetTypePrizeUpdateComponent;
  let fixture: ComponentFixture<BetTypePrizeUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetTypePrizeUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetTypePrizeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
