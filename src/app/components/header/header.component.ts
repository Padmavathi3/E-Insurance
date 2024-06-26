import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataserviceService } from 'src/app/services/dataservice/dataservice.service';
import { DOWNLOAD_ICON, MENU_ICON, SEARCH_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  drawerState: boolean = false;
  subscription!: Subscription;

  constructor(
    private dataService: DataserviceService,
    private domSanitizer: DomSanitizer,
    private router: Router,
    private matIconRegistry: MatIconRegistry
  ) {
    matIconRegistry.addSvgIconLiteral("menu-icon", domSanitizer.bypassSecurityTrustHtml(MENU_ICON)),
    matIconRegistry.addSvgIconLiteral("search-icon", domSanitizer.bypassSecurityTrustHtml(SEARCH_ICON)),
    matIconRegistry.addSvgIconLiteral("download-icon", domSanitizer.bypassSecurityTrustHtml(DOWNLOAD_ICON))
  }

  ngOnInit(): void {
    this.subscription = this.dataService.currDrawerState.subscribe(state => this.drawerState = state);
  }

  handleDrawerClick() {
    this.dataService.changeDrawerState(!this.drawerState);
  }

  logIn() {
    this.router.navigate(['/'], { queryParams: { userRole: 'customer' } });
  }

  logOut() {
    localStorage.removeItem('AuthToken');
  }
}
