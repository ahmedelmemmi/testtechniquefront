import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
;
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
}) 
export class UserService {
URL="http://localhost:3000/user" ; 
connectedUser :BehaviorSubject<User>=new BehaviorSubject<User>(null) ;
Email :BehaviorSubject<String>=new BehaviorSubject<String>(null) ;

  constructor(private http:HttpClient ) { }
 
  getuserbyusername(username: any) {
    return this.http.get<User>(this.URL +'/getuser/' + username) ; 
  }

   


}
