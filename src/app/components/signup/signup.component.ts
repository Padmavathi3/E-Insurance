import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataserviceService } from 'src/app/services/dataservice/dataservice.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  userRole: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private dataservice: DataserviceService,
    private userService: UserService,
    private router: Router,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.route.params.subscribe((res1:any )=> {
      console.log(res1);
    this.dataservice.changeUserRole(res1)
    });


  }

  get signupControl() {
    return this.signupForm.controls;
  }

  handleSignup() {
    if (this.signupForm.invalid) {
      console.log("Form is invalid");
      return;
    }
    this.dataservice.userRoleState.subscribe((res: any) => {
      this.userRole = res.userRole;
      console.log('UserRole:', res);
    });    const { fullname, email, mobileNumber, password } = this.signupForm.value;
    console.log(this.userRole);
    
    if (this.userRole === 'admin') {
      const adminBody = {
        name: fullname,
        email: email,
        passwordHash: password,
        phoneNumber: mobileNumber,
        role: 'admin',
        createdDate: new Date().toISOString()
      };

      this.userService.adminRegistrationCall(adminBody).subscribe({
        next: (res) => {
          console.log('Registration successful', res);
          this.router.navigate(['/dashboard',this.userRole]); // Replace with your desired path
        },
        error: (err) => {
          console.error('Registration error', err);
          alert(`Registration failed: ${err.message}`); // Display a user-friendly error message
        }
      });
    } 
    else if(this.userRole=='agent')
    {
      const agentBody = {
        name: fullname,
        email: email,
        passwordHash: password,
        phoneNumber: mobileNumber,
        role: 'agent',
        createdDate: new Date().toISOString()
      };

      this.userService.agentRegistrationCall(agentBody).subscribe((res)=>
      {
        console.log('Registration successful', res);
          this.router.navigate(['/dashboard',this.userRole]); // Replace with your desired path
      },
      (err)=>console.log(err));
    }
    else if(this.userRole=='employee')
      {
        const employeeBody = {
          name: fullname,
          email: email,
          passwordHash: password,
          phoneNumber: mobileNumber,
          role: 'employee',
          createdDate: new Date().toISOString()
        };
  
        this.userService.employeeRegistrationCall(employeeBody).subscribe((res)=>
        {
          console.log('Registration successful', res);
            this.router.navigate(['/dashboard',this.userRole]); // Replace with your desired path
        },
        (err)=>console.log(err));
      }
      else if(this.userRole=='customer')
        {
          const customerBody = {
            name: fullname,
            email: email,
            passwordHash: password,
            phoneNumber: mobileNumber,
            role: 'customer',
            createdDate: new Date().toISOString()
          };
    
          this.userService.customerRegistrationCall(customerBody).subscribe((res)=>
          {
            console.log('Registration successful', res);
              this.router.navigate(['/dashboard',this.userRole]); // Replace with your desired path
          },
          (err)=>console.log(err));
        }
    else {
      console.log("API call is not done for non-admin roles");
    }
  }
}
