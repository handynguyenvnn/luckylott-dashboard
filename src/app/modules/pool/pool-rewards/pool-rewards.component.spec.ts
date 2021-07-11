import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PoolRewardsComponent } from './pool-rewards.component';

describe('PoolRewardsComponent', () => {
  let component: PoolRewardsComponent;
  let fixture: ComponentFixture<PoolRewardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolRewardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
