import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteByActionComponent } from './delete-by-action.component';

describe('DeleteByActionComponent', () => {
  let component: DeleteByActionComponent;
  let fixture: ComponentFixture<DeleteByActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteByActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteByActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
