import { Component, OnInit } from '@angular/core';
import { PolicyService } from 'src/app/services/policy-service/policy.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customer-policies',
  templateUrl: './customer-policies.component.html',
  styleUrls: ['./customer-policies.component.scss'],
  providers: [DatePipe]
})
export class CustomerPoliciesComponent implements OnInit {
  policies: any[] = [];
  selectedPolicy: any | null = null;
  currentDate: string | null = null;

  constructor(private policyService: PolicyService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.policyService.getCustomerPoliciesCall().subscribe((res) => {
      this.policies = res.data;
    });
    this.currentDate = this.datePipe.transform(new Date(), 'MM/dd/yyyy');
  }

  formatDate(date: string): string | null {
    return this.datePipe.transform(date, 'MMMM d');
  }

  makePayment(policy: any): void {
    this.selectedPolicy = policy;
  }

  processPayment(): void {
    if (this.selectedPolicy) {
      const paymentData = {
        customerPolicyId: this.selectedPolicy.customerPolicyId,
        paymentDate: new Date().toISOString(),
        amount: this.selectedPolicy.premiumAmount
      };

      this.policyService.processPaymentCall(paymentData).subscribe(
        response => {
          console.log('Payment successful', response);
          this.selectedPolicy = null;
        },
        error => {
          console.error('Payment failed', error);
        }
      );
    }
  }

  cancelPolicy(policy: any): void {
    if (policy && confirm(`Are you sure you want to cancel the policy: ${policy.policyName}?`)) {
      this.policyService.deletePolicyCall(policy.customerPolicyId).subscribe(
        response => {
          console.log('Policy canceled successfully', response);
          this.policies = this.policies.filter(p => p.customerPolicyId !== policy.customerPolicyId);
        },
        error => {
          console.error('Failed to cancel policy', error);
        }
      );
    }
  }
}
