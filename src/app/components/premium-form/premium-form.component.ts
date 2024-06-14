import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PolicyService } from 'src/app/services/policy-service/policy.service';

@Component({
  selector: 'app-premium-form',
  templateUrl: './premium-form.component.html',
  styleUrls: ['./premium-form.component.scss']
})
export class PremiumFormComponent implements OnInit {
  policyId !: number;
  policyForm!: FormGroup;
  premiumResult: number | null = null;
  selectedPaymentOption: string = '';
  isFormSubmitted: boolean = false;

  constructor(private fb: FormBuilder, private policyService: PolicyService,private activatedRoute: ActivatedRoute) {
    this.policyForm = this.fb.group({
      coverageAmount: [0, Validators.required],
      policyTerm: [0, Validators.required],
      paymentFrequency: ['', Validators.required],
      age: ['', Validators.required],
      policyType: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Get policyId from query params
    this.activatedRoute.queryParams.subscribe(params => {
      this.policyId = +params['policyId'];
    });
   }

   calculatePremium(): void {
    if (!this.policyId) {
      console.error('Policy ID is null. Unable to calculate premium.');
      return;
    }
  
    if (this.policyForm.valid) {
      const formData = this.policyForm.value;
      console.log(formData);
      const { coverageAmount, policyTerm, paymentFrequency, age, policyType } = this.policyForm.value;
  
      // Prepare the request body
      const requestBody = {
        policyId: this.policyId, // Ensure policyId is not null
        customerAge: age,
        coverageAmount: coverageAmount,
        policyType: policyType,
        paymentFrequency: paymentFrequency,
        termYears: policyTerm
      };
  
      // Call the premium calculation API
      this.policyService.premiumCalculationCall(requestBody).subscribe(
        response => {
          this.premiumResult = response.premium;
          console.log("premium amount", this.premiumResult);
          
        },
        error => {
          console.error('Error calculating premium:', error);
        }
      );
    }
  }
  
  
  purchase(): void {
    this.policyService.policyPurchaseCall().subscribe(
      () => {
        console.log("Policy purchased successfully");
      },
      error => {
        console.error('Error purchasing policy:', error);
      }
    );
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
