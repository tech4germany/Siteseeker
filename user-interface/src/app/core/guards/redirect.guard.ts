import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/utility-services/auth.service';

@Injectable({
  providedIn: 'root',
})
/* If the user is logged in, redirect them to the landing page */
export class RedirectGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn == true) {
      this.router.navigate(['landingspace']);
    }
    return true;
  }
}
