import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from 'src/app/services/dataservice/dataservice.service';
import { PolicyService } from 'src/app/services/policy-service/policy.service';
import {jwtDecode} from 'jwt-decode';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent implements OnInit {
  userRole: string = '';
  policiesList: any[] = [];
  selectedPolicyId: number | null = null; 
  constructor(private dataService: DataserviceService, private policyService: PolicyService, private router: Router) { }

  ngOnInit(): void {
    this.dataService.userRoleState.subscribe((res: any) => {
      this.userRole = res.userRole;
      console.log('UserRole:', res);
    });

    this.policyService.getAllPoliciesCall().subscribe(res => {
      this.policiesList = res.data.map((policy: any) => ({ ...policy, cartDetails: false })); 
      console.log("get all policies", res.data);
      this.policyService.getAllPolicies(res);
    });
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }

  buyNow(policyId: number) { 
    console.log("buy now method is calling");

    const authToken = localStorage.getItem('AuthToken');
    if (authToken) {
      console.log("Token is present:", authToken);

      try {
        const decodedToken: any = this.getDecodedAccessToken(authToken);
        const role = decodedToken.role;
        console.log("Decoded Token Role:", role);

        if (role === 'customer') {
          this.selectedPolicyId = policyId; // Store the selected policy ID
          this.router.navigate(['/dashboard/customer', 'purchaseForm'], { queryParams: { policyId: policyId } }); // Pass policyId as query param
        } else {
          console.log("User is not a customer. Redirecting to login page.");
          this.router.navigate(['/'], { queryParams: {userRole: 'customer' } });
        }
      } 
      catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      console.log("Token is not present. Redirecting to login page.");
      this.router.navigate(['/'], { queryParams: { userRole: 'customer' } });
    }
  }

  learnMore(policy: any) {
    policy.cartDetails = !policy.cartDetails;  // Toggle cartDetails for the specific policy
  }
}
