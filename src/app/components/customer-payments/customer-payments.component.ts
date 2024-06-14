import { Component, OnInit } from '@angular/core';
import { PolicyService } from 'src/app/services/policy-service/policy.service';

@Component({
  selector: 'app-customer-payments',
  templateUrl: './customer-payments.component.html',
  styleUrls: ['./customer-payments.component.scss']
})
export class CustomerPaymentsComponent implements OnInit {
  payments: any[] = [];

  constructor(private policyService: PolicyService) { }

  ngOnInit(): void {
    this.policyService.getPaymentsCall().subscribe(
      response => {
        if (response.success) {
          this.payments = response.data.map((payment: any) => ({
            paymentId: payment.paymentId,
            id: payment.customerPolicyId,
            policyName: 'Policy Name Placeholder',  // Replace with actual policy name if available
            status: payment.status,
            paymentDate: new Date(payment.paymentDate).toLocaleDateString(),
            premium: payment.amount
          }));
        } else {
          // Handle error or no payments scenario
          console.error(response.message);
        }
      },
      error => {
        console.error('Error fetching payments', error);
      }
    );
  }
}
