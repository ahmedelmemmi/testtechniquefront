import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }
isLoggedIn= false
  ngOnInit(): void {
    if (localStorage.getItem("currentuser") != null) {
      this.isLoggedIn= true
      
    }
  }
  
logOut(){
  localStorage.clear()
  window.location.reload()
}
}
