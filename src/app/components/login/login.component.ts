import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormVisible = false;

  constructor() { }

  ngOnInit(): void {
  }

  showLoginForm(): void {
    this.loginFormVisible = true;
  }

  login(): void {
    // Login logic
  }
}
