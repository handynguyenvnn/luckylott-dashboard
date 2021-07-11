import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerAddCreditComponent } from './player-add-credit.component';

describe('PlayerAddCreditComponent', () => {
  let component: PlayerAddCreditComponent;
  let fixture: ComponentFixture<PlayerAddCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerAddCreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerAddCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
