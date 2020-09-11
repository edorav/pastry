import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    protected router: Router,
    private userService: UserService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem('api_token')) {
        this.userService.setLoggedUser(this.userService.getLoggedUser());
        return resolve(true);
      } else {
        this.router.navigate(['login']);
        localStorage.clear();
        return resolve(false);
      }
    });
  }
}
