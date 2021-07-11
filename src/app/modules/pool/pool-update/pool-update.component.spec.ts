import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PoolUpdateComponent } from 'src/app/modules/pool/pool-update/pool-update.component';

describe('PoolUpdateComponent', () => {
  let component: PoolUpdateComponent;
  let fixture: ComponentFixture<PoolUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
