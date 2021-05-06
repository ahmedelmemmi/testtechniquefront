import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/AuthService';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService,private jwtHelper : JwtHelperService,private router: Router,) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
        const currentUser = this.authenticationService.currentuserValue;
        const isLoggedIn = currentUser && currentUser.token;
        
       // const isApiUrl = request.url.startsWith(config.apiUrl);
       if (isLoggedIn ) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${currentUser.token}`
            }
        });
        if(this.jwtHelper.isTokenExpired(currentUser.token)){
            localStorage.clear();
            this.router.navigateByUrl("/login");
          }
    }

   
        
        return next.handle(request);
    }
}