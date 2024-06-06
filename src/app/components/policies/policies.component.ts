import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from 'src/app/services/dataservice/dataservice.service';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent implements OnInit {
  userRole:string='';
  items=Array(5)// Initialize items array with your data
  cartDetails: boolean = false; // Define cartDetails property if needed

  constructor(private dataService:DataserviceService) { }

  ngOnInit(): void {
    this.dataService.userRoleState.subscribe((res: any) => {
      this.userRole = res.userRole;
      console.log('UserRole:', res);
    });
  }

  // buyNow() {
  //   this.router.navigate(['/customerDashboard', this.userRole, 'policies','policyForm']);

  //}

  learnMore() {
this.cartDetails=true  
}
}
