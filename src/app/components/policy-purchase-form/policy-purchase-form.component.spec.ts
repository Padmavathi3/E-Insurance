import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyPurchaseFormComponent } from './policy-purchase-form.component';

describe('PolicyPurchaseFormComponent', () => {
  let component: PolicyPurchaseFormComponent;
  let fixture: ComponentFixture<PolicyPurchaseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyPurchaseFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyPurchaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
