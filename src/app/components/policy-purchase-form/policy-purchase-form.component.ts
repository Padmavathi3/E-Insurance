import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PolicyService } from 'src/app/services/policy-service/policy.service';
import {jwtDecode} from 'jwt-decode';

@Component({
  selector: 'app-policy-purchase-form',
  templateUrl: './policy-purchase-form.component.html',
  styleUrls: ['./policy-purchase-form.component.scss']
})
export class PolicyPurchaseFormComponent implements OnInit {
  userRole = 'customer';
  personalDetailsForm!: FormGroup;
  agents = [
    { id: 1, name: 'Agent1', location: 'Chennai' },
    { id: 2, name: 'Agent3', location: 'Bangaloore' },
    { id: 3, name: 'Agent2', location: 'Hyderabad' }
  ];
  age!: number;
  policyId!: number; // Add this line
  customerId!: number; // Add this line

  constructor(private fb: FormBuilder, private router: Router, private policyService: PolicyService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.personalDetailsForm = this.fb.group({
      annualIncome: ['', Validators.required],
      dob: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      emailId: ['', [Validators.required, Validators.email]],
      agent: ['', Validators.required],
      address: ['', Validators.required],
      // acceptPolicy: [false, Validators.requiredTrue]
    });

    this.personalDetailsForm.get('dob')?.valueChanges.subscribe(value => {
      this.age = this.calculateAge(value);
    });

    // Get policyId from query params
    this.activatedRoute.queryParams.subscribe(params => {
      this.policyId = +params['policyId'];
    });

    // Get customerId from token
    const authToken = localStorage.getItem('AuthToken');
    if (authToken) {
      const decodedToken: any = jwtDecode(authToken);
      this.customerId = +decodedToken.CustomerId;
    }
  }

  calculateAge(birthday: string): number {
    const birthDate = new Date(birthday);
    const ageDiffMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiffMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  addCustomerDetails(): void {
    if (this.personalDetailsForm.valid) {
      const formValue = this.personalDetailsForm.value;
      // this.router.navigate(['/dashboard', this.userRole, 'premium']);

      // Parse annualIncome as a number
      const annualIncomeNumber = parseFloat(formValue.annualIncome);

      // Check if annualIncomeNumber is a valid number
      if (!isNaN(annualIncomeNumber)) {
        const body = {
          customerId: this.customerId, // Add customerId from token
          policyId: this.policyId, // Add policyId from the query params
          purchaseDate: new Date().toISOString(),
          agentId: formValue.agent.id,
          annualIncome: annualIncomeNumber,
          dateOfBirth: formValue.dob,
          firstName: formValue.firstName,
          lastName: formValue.lastName,
          gender: formValue.gender,
          mobileNumber: formValue.mobileNumber,
          address: formValue.address
        };

        this.policyService.customerDetailsCall(body).subscribe(response => {
          console.log('Policy purchased successfully', response);
          // Handle success response
          this.router.navigate(['/dashboard', this.userRole, 'premium'],{ queryParams: { policyId: this.policyId }});
        }, 
        error => {
          console.error('Error purchasing policy', error);
          // Handle error response
        });
      } else {
        // Handle the case where the annualIncome is not a valid number
        console.error('Invalid annualIncome value:', formValue.annualIncome);
      }
    }
  }
}
