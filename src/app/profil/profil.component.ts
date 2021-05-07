import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { AuthService } from '../Services/AuthService';
import { UserService } from '../Services/UserService';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  constructor(

  ) { }
username:any;

  ngOnInit(): void {
    this.username=  localStorage.getItem("userConnected")
 
  }
 

}
