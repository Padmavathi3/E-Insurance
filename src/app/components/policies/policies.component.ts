import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from 'src/app/services/dataservice/dataservice.service';
import { PolicyService } from 'src/app/services/policy-service/policy.service';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent implements OnInit {
  userRole: string = '';
  policiesList: any[] = [];

  constructor(private dataService: DataserviceService, private policyService: PolicyService) { }

  ngOnInit(): void {
    this.dataService.userRoleState.subscribe((res: any) => {
      this.userRole = res.userRole;
      console.log('UserRole:', res);
    });

    this.policyService.getAllPoliciesCall().subscribe(res => {
      this.policiesList = res.data.map((policy: any) => ({ ...policy, cartDetails: false })); // Initialize cartDetails for each policy
      console.log("get all books", res.data);
      this.policyService.getAllPolicies(res);
    });
  }

  learnMore(policy: any) {
    policy.cartDetails = !policy.cartDetails;  // Toggle cartDetails for the specific policy
  }
}
