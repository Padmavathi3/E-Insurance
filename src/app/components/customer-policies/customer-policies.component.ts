import { Component, OnInit } from '@angular/core';
import { PolicyService } from 'src/app/services/policy-service/policy.service';
import { PolicyObj } from 'src/assets/policyInterface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customer-policies',
  templateUrl: './customer-policies.component.html',
  styleUrls: ['./customer-policies.component.scss'],
  providers: [DatePipe] // Add DatePipe to providers
})
export class CustomerPoliciesComponent implements OnInit {
  policies: any[] = [];

  constructor(private policyService: PolicyService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.policyService.getCustomerPoliciesCall().subscribe((res) => {
      this.policies = res.data;
    });
  }

  formatDate(date: string): string | null {
    return this.datePipe.transform(date, 'MMMM d');
  }

  makePayment(policy: PolicyObj): void {
    // Implement payment logic here
    console.log(`Making payment for policy: ${policy.policyName}`);
  }

  cancelPolicy(policy: PolicyObj): void {
    // Implement cancel logic here
    console.log(`Cancelling policy: ${policy.policyName}`);
  }
}
