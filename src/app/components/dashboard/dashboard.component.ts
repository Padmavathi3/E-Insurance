import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataserviceService } from 'src/app/services/dataservice/dataservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private dataService: DataserviceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((res1:any )=> {
      console.log(res1);
    this.dataService.changeUserRole(res1)
    });
  }
  
}
