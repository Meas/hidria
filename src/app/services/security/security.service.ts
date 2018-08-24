import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import {HelperService} from '../helper/helper.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  permissions = {
    comparison: false,
    admin: false
  };

  constructor(private authService: AuthService, private router: Router, private helper: HelperService) {
    this.authService.permissions.subscribe((data) => {
      this.permissions = data;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean {
    console.log(this.permissions);

    if (this.authService.isLoggedIn()) {
      if (route.routeConfig.path === 'comparisons') {
        return this.permissions.comparison;
      }
      if (route.routeConfig.path === 'users' || route.routeConfig.path === 'statistics' || route.routeConfig.path === 'users/edit/:id') {
        return this.permissions.admin;
      }
      return true;
    } else {
      this.router.navigate(['auth']);
      return false;
    }
  }

}
