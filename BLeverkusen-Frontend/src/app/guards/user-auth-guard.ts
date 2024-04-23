import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const UserAuthGuard : CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const jwtHelper = inject(JwtHelperService);
    const router = inject(Router);
    const token = localStorage.getItem('token');

    if (token && !jwtHelper.isTokenExpired(token)) {
        return true;
    }

    router.navigate(['']);
    return false;

}

