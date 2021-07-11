import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRefCodeComponent } from './update-ref-code.component';

describe('UpdateRefCodeComponent', () => {
  let component: UpdateRefCodeComponent;
  let fixture: ComponentFixture<UpdateRefCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRefCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRefCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
