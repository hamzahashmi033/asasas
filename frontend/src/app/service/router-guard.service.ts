import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import jwtDecode from 'jwt-decode';
import { UserService } from './user.service';
import { GlobalConstants } from '../shared/global-constant';

@Injectable({
  providedIn: 'root'
})
export class RouterGuardService {
  constructor(
    public userService: UserService,
    private router: Router,
    private snackBar: SnackbarService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let expectedRoleArray: any = route.data;
    expectedRoleArray = expectedRoleArray.expectedRole;

    const token: string = localStorage.getItem('token')!;
    let tokenPayload: any;

    try {
      tokenPayload = jwtDecode(token);
    } catch (error) {
      localStorage.clear();
      this.router.navigate(['/']);
    }

    let checkRole = false;

    for (let role of expectedRoleArray) {
      if (role === tokenPayload.role) {
        checkRole = true;
      }
    }

    if (tokenPayload.role === 'user' || tokenPayload.role === 'admin') {
      if (this.userService.getUserFromLocalStorage() && checkRole) {
        return true;
      }
      
      this.snackBar.openSnackBar(
        GlobalConstants.unauthorized,
        GlobalConstants.error
      );

      this.router.navigate(['/']);
      return false;
    } else {
      this.router.navigate(['/']);
      localStorage.clear();
      return false;
    }
  }
}