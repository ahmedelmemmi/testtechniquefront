import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './AuthService';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,private router: Router) {}

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
     //const currentUser = this.authService.currentuserValue;
     const currentUser = localStorage.getItem('currentuser');

     if (currentUser) {
       return true;
     }else{
     // localStorage.removeItem('currentuser');
      localStorage.clear()
      this.router.navigate(['/login'],{queryParams:{}})
      
      return false;
     }
     
   }
}


