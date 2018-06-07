import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class SecurityService {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['auth']);
      return false;
    }
  }

}
