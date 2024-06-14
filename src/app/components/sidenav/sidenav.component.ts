import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataserviceService } from 'src/app/services/dataservice/dataservice.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  userRole:string=''
  drawerState: boolean = false;
  // subscription!: Subscription;

  constructor(private dataService: DataserviceService, private router: Router) { }

  ngOnInit(): void {
    this.dataService.userRoleState.subscribe((res: any) => {
      this.userRole = res.userRole;
      console.log('UserRole:', res);
    });

    this.dataService.currDrawerState.subscribe(state => {
      this.drawerState = state;
    });
  }

}
