import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  constructor(private jwtHelper : JwtHelperService,private router: Router) {
    
   }

  ngOnInit(): void {
    let token = localStorage.getItem("currentuser") 
    if(this.jwtHelper.isTokenExpired(token)){
      localStorage.clear();
      this.router.navigateByUrl("/login");
    }
  }

}
