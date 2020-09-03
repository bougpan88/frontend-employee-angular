import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service'
import { routePaths } from '../routes'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  loginUrl : string = routePaths.login;
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = localStorage.getItem('user');
    if (token) {
        // logged in so return true
        return true;
    }
    this.authService.lastRequestedUrl = state.url;
    // not logged in so redirect to login page with the return url
    this.router.navigate([this.loginUrl]);
    return false;
}
  
}
