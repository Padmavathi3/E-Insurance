import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataserviceService } from 'src/app/services/dataservice/dataservice.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormVisible = false;
  loginForm!: FormGroup;
  userRole:string=''

  constructor(private formBuilder: FormBuilder,private route:Router,private dataservice:DataserviceService,private userService:UserService) { }

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
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    this.userService.loginCall(email, password, this.userRole).subscribe(
      response => {
        console.log('Login successful', response);
        // Save token and navigate to user role dashboard
        localStorage.setItem('AuthToken', response.token);
        this.dataservice.changeUserRole(this.userRole);
        this.route.navigate([`/dashboard/`, this.userRole]);
      },
      error => {
        console.error('Login failed', error);
        // Handle login failure (e.g., show error message)
      }
    );
  }
  handleRegister()
  {
    this.dataservice.changeUserRole(this.userRole);
    this.route.navigate(['/signup',this.userRole])
  }
 
}
