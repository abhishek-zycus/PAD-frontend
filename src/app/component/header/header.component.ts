//Abhishek

import { Component, DoCheck, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import isMobile from 'src/app/utils/isMobile.utils';
import { AuthService } from 'src/app/services/auth.service';
import isAuthenticated from 'src/app/utils/isAuthenticated.utils';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements DoCheck {
  constructor(
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService
  ) {}
  isMobile: boolean = false;
  isLoggedIn: boolean = true;
  showAdminPortalLink: boolean = false;

  logoutUser() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
    this.messageService.add({
      severity: 'success',
      key: 'Success',
      detail: 'Logout successful',
    });
    this.isLoggedIn = false;
    this.authService.setShowAdminPortalLink(false);
  }

  setIsLoggedin() {
    if (isAuthenticated()) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  ngDoCheck() {
    this.setIsLoggedin();
    this.isMobile = isMobile();
    this.showAdminPortalLink = this.authService.showAdminPortalLink;
  }
}
