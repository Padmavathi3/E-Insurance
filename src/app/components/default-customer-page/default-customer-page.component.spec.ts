import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultCustomerPageComponent } from './default-customer-page.component';

describe('DefaultCustomerPageComponent', () => {
  let component: DefaultCustomerPageComponent;
  let fixture: ComponentFixture<DefaultCustomerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultCustomerPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultCustomerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
