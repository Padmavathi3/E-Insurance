import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-premium-form',
  templateUrl: './premium-form.component.html',
  styleUrls: ['./premium-form.component.scss']
})
export class PremiumFormComponent implements OnInit {
  policyForm!: FormGroup;
  premiumResult: number | null = null;
  selectedPaymentOption: string = '';
  isFormSubmitted: boolean = false;

constructor(private fb: FormBuilder) {
    this.policyForm = this.fb.group({
      coverageAmount: [0, Validators.required],
      policyTerm: [0, Validators.required],
      paymentFrequency: ['', Validators.required],
      age:['',Validators.required],
      policyType:['',Validators.required]
    });
  }

  ngOnInit(): void {
    
  }

  calculatePremium():void
  {
    if (this.policyForm.valid) {
      const formData = this.policyForm.value;
      console.log(formData);
      const { coverageAmount, policyTerm, paymentFrequency } = this.policyForm.value;
      // Premium calculation logic (example)
      this.premiumResult = coverageAmount * policyTerm * (paymentFrequency === 'Yearly' ? 1 : paymentFrequency === 'Half-Yearly' ? 0.5 : 1 / 12);
    }
  }

  selectPaymentOption(option: string): void {
    this.selectedPaymentOption = option;
    console.log('Selected Payment Option:', option);
  }

  onSubmit(): void {
    if (this.policyForm.valid) {
      this.isFormSubmitted = true;
    }
  }
}


