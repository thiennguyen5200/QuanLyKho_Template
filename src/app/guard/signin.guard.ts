import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SigninGuard implements  CanActivate{
  constructor(
    private router: Router,
) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!!localStorage.getItem('_token')) {
      // authorised so return true
      return true;
    } else {
      this.router.navigate(['/signin'], { queryParams: { returnUrl: state.url }});
      return false;
    }
    
  }
}