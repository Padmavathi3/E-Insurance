import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCustomerPoliciesComponent } from './all-customer-policies.component';

describe('AllCustomerPoliciesComponent', () => {
  let component: AllCustomerPoliciesComponent;
  let fixture: ComponentFixture<AllCustomerPoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCustomerPoliciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCustomerPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
