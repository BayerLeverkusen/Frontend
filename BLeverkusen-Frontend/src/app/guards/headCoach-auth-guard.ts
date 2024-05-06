import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const HeadCoachAuthGuard : CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const jwtHelper = inject(JwtHelperService);
    const router = inject(Router);
    const token = localStorage.getItem('token');

    if (token && !jwtHelper.isTokenExpired(token)) {
      const decodedToken = jwtHelper.decodeToken(token);
      if (decodedToken.role === 'HEAD_COACH') {
        return true;
      }
    }

    router.navigate(['']);
    return false;

}

