import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PolicyService } from 'src/app/services/policy-service/policy.service';

@Component({
  selector: 'app-all-customer-policies',
  templateUrl: './all-customer-policies.component.html',
  styleUrls: ['./all-customer-policies.component.scss'],
  providers: [DatePipe]
})
export class AllCustomerPoliciesComponent implements OnInit {
  policies: any[] = [];
  currentDate: string | null = null;

  constructor(private policyService: PolicyService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.policyService.getAllCustomerPoliciesCall().subscribe((res) => {
      this.policies = res.data;
    });
  }

  formatDate(date: string): string {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = this.datePipe.transform(dateObj, 'MMMM');
    const year = dateObj.getFullYear();

    return `${this.getDayWithSuffix(day)} ${month} ${year}`;
  }

  getDayWithSuffix(day: number): string {
    if (day > 3 && day < 21) return day + 'th'; // for 11th, 12th, 13th
    switch (day % 10) {
      case 1: return day + 'st';
      case 2: return day + 'nd';
      case 3: return day + 'rd';
      default: return day + 'th';
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
