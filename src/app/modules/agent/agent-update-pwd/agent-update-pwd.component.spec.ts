import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentUpdatePwdComponent } from './agent-update-pwd.component';

describe('AgentUpdatePwdComponent', () => {
  let component: AgentUpdatePwdComponent;
  let fixture: ComponentFixture<AgentUpdatePwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentUpdatePwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentUpdatePwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
