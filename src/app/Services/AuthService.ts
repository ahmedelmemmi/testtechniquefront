
import {​​​​​​​​ Injectable }​​​​​​​​ from'@angular/core';
import {​​​​​​​​ HttpClient }​​​​​​​​ from'@angular/common/http';
import {​​​​​​​​ BehaviorSubject, Observable,Subscription,of }​​​​​​​​ from'rxjs';
import {​​​​​​​​ map, delay, finalize }​​​​​​​​ from'rxjs/operators';
import { User } from '../models/User';
import { Router } from '@angular/router';



@Injectable({​​​​​​​​ providedIn:'root' }​​​​​​​​)
export class AuthService {​​​​​​​​
public currentuserSubject: BehaviorSubject<User>;
private isLoadingSubject: BehaviorSubject<boolean>
isLoading$: Observable<boolean>;
profil: BehaviorSubject<string>;
public currentuser: Observable<User>;
public currentprofil:Observable<string> ; 
URL = "https://test-technique-memmi.herokuapp.com:3000/user"
tokenSubscription = new Subscription()
timeout;
constructor(private http: HttpClient,private router: Router) {
  ​​​​​​​​this.isLoadingSubject= new BehaviorSubject<boolean>(false)
  this.isLoading$=this.isLoadingSubject.asObservable();
this.currentuserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentuser')));
this.currentuser = this.currentuserSubject.asObservable();
this.profil=new BehaviorSubject<string>(JSON.parse(localStorage.getItem('currentuser'))) ; 
this.currentprofil=this.profil.asObservable() ;
 }​​​​​​​​
 
public get currentuserValue(): User {
​​​​​​​​
return this.currentuserSubject.value;

 }​​​​​​​​
 
/* public get currentprofilValue(): string {​​​​​​​​
 return this.profil.value ; 
 }​​​​​​​​
 */
login(user){
  console.log(user)
  this.isLoadingSubject.next(true);
    return this.http.post<any>(this.URL+'/login', user).pipe(
      map(User=> {​​​​​​​​
    // login successful if there's a jwt token in the response
        if (User && User.token) {
    ​​​​​​​​
    // store Adherent details and jwt token in local storage to keep Adherent logged in between page refreshes
    localStorage.setItem('currentuser', JSON.stringify(User));
    this.currentuserSubject.next(User);
     }​​​​​​​​
    return User;
 }​​​​​​​​),
 finalize(()=>this.isLoadingSubject.next(false))

 );
 
 }​​​​​​​​

 logout() {​​​​​​​​
 // remove Adherent from local storage to log Adherent out
   //localStorage.removeItem('currentuser');
//  this.currentuserSubject.next(null);
    this.router.navigateByUrl("/login");
    
  }
​​​​​​​​
}​​​​​​​​

