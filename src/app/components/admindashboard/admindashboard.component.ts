import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss']
})
export class AdmindashboardComponent implements OnInit {
  showSignupButtons: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSignupButtons(): void {
    this.showSignupButtons = !this.showSignupButtons;
  }
}
