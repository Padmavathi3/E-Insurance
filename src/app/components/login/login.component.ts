import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataserviceService } from 'src/app/services/dataservice/dataservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormVisible = false;
  loginForm!: FormGroup;
  userRole:string=''

  constructor(private formBuilder: FormBuilder,private route:Router,private dataservice:DataserviceService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get loginControl() {
    return this.loginForm.controls;
  }

  showLoginForm(): void {
    this.loginFormVisible = true;
  }
  handleCustomer()
  {
    this.route.navigate([`/dashboard/`,this.userRole])    //go to customer role dashboard
  }

  login(): void {
    console.log(this.loginControl);
    if(this.loginForm.invalid) return
    const {email, password} = this.loginForm.value
    this.route.navigate([`/dashboard/`,this.userRole])    //go to user role dashboard

    // if(this.userRole=='customer')
    //   {
    //     this.route.navigate([`/customerDashboard/`,this.userRole])    //go to user role dashboard
    //   }
    // else if(this.userRole=='employee')
    //   {
    //     this.route.navigate([`/employeeDashboard/`,this.userRole])    //go to employee role dashboard
    //   }
    // else if(this.userRole=='agent')
    //   {
    //     this.route.navigate([`/agentDashboard/`,this.userRole])    //go to agnet role dashboard
    //   }
    //  else if(this.userRole=='admin')
    //    {
    //       this.route.navigate([`/adminDashboard/`,this.userRole])    //go to admin role dashboard
    //    }

    console.log('user role',this.userRole);
    this.dataservice.changeUserRole(this.userRole);

  }
  handleRegister()
  {
    this.dataservice.changeUserRole(this.userRole);
    this.route.navigate(['signup'])
  }
 
}
