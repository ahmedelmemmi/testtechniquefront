import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
;
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
}) 
export class UserService {
URL="https://test-technique-memmi.herokuapp.com/user" ; 

connectedUser :BehaviorSubject<User>=new BehaviorSubject<User>(null) ;
Email :BehaviorSubject<String>=new BehaviorSubject<String>(null) ;

  constructor(private http:HttpClient ) { }
 
  getuserbyusername(username: any) {
    return this.http.get<User>(this.URL +'/getuser/' + username) ; 
  }
  createcompte(user: User){
    return this.http.post(`${this.URL}/register`,user)
  }

   


}
