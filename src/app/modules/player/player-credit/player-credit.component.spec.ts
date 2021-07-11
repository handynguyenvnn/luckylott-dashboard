import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCreditComponent } from './player-credit.component';

describe('PlayerCreditComponent', () => {
  let component: PlayerCreditComponent;
  let fixture: ComponentFixture<PlayerCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerCreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
