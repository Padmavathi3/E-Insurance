import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentSoldPoliciesComponent } from './agent-sold-policies.component';

describe('AgentSoldPoliciesComponent', () => {
  let component: AgentSoldPoliciesComponent;
  let fixture: ComponentFixture<AgentSoldPoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentSoldPoliciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentSoldPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
