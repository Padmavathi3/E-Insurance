import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataserviceService } from 'src/app/services/dataservice/dataservice.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormVisible = false;
  loginForm!: FormGroup;
  userRole: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataservice: DataserviceService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.activatedRoute.queryParams.subscribe(params => {
      const role = params['userRole'];
      if (role) {
        this.userRole = role;
        if (this.isCustomerLoggedIn()) {
          this.router.navigate(['/dashboard/customer']);
        } else {
          this.showLoginForm();
        }
      }
    });
  }

  get loginControl() {
    return this.loginForm.controls;
  }

  showLoginForm(): void {
    this.loginFormVisible = true;
  }

  handleCustomer() {
    this.router.navigate(['/dashboard/customer']);
  }

  isCustomerLoggedIn(): boolean {
    const token = localStorage.getItem('AuthToken');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.role === 'customer';
      } catch (error) {
        console.error("Error decoding token:", error);
        return false;
      }
    }
    return false;
  }

  login(): void {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    this.userService.loginCall(email, password, this.userRole).subscribe(
      response => {
        console.log('Login successful', response);
        if (response && response.data) {
          localStorage.setItem('AuthToken', response.data);
          console.log('Token stored:', response.data);
        } else {
          console.error('Token is missing in the response');
        }
        this.dataservice.changeUserRole(this.userRole);
        this.router.navigate([`/dashboard/`, this.userRole]);
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }

  handleRegister() {
    this.dataservice.changeUserRole(this.userRole);
    this.router.navigate(['/signup', this.userRole]);
  }
}
