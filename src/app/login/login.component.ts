import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router ,ParamMap} from '@angular/router';
import {User} from '../models/User';
import {UserService} from '../Services/UserService';
import {AuthService} from '../Services/AuthService';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  // defaultAuth: any = {
  //   username: 'ahmeddd',
  //   password: '123456',
  // };
  loginForm: FormGroup;
  hasError: boolean;
  email:any;
  returnUrl: string;
  isLoading$: Observable<boolean>;
  username:any;
  password:any;
  hide = true;
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  user: User;
  formError
  codeAssure: any;
  fieldTextType: boolean;
  codeassureparam:any;
  constructor(
    private fb: FormBuilder,
   // private authService: AuthService,
    private route: ActivatedRoute,
    private userservice:UserService,
    private authServe:AuthService,
    private router: Router
  ) {
    // this.route.paramMap.subscribe(
    //   (params: ParamMap) => {
    //     this.codeassureparam = params.get('code_assure');
    //   }
    // )
    this.isLoading$= this.authServe.isLoading$;
    // redirect to home if already logged in
    if (localStorage.getItem("currentuser")) {
      this.router.navigate(['/']);
    }else if(localStorage.getItem("currentuser")){
      this.router.navigate(['/login'])
    }
    //  else{
    //     this.router.navigate(['/auth/login'])
    //   }
     
    
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  ngOnInit(): void {
    this.initForm();
    
    // this.route.paramMap.subscribe(
    //   (params: ParamMap) => {
    //     this.codeAssure = params.get('code_assure');
        
    //     if(this.codeAssure!=null){
    //       this.adherentservice.activatecompte(this.codeAssure,1).subscribe();
          
    //     }
    //   }
    // )
      
    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'.toString()] || '/dashboard';
  }

  // convenience getter for easy access to form fields
  get f() {
    
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: [
        this.username,
         Validators.compose([
           Validators.required,
           Validators.minLength(3),
           Validators.maxLength(320),
         ]),
      ],
      password: [
        this.password,
         Validators.compose([
           Validators.required,
           Validators.minLength(3),
           Validators.maxLength(100),
         ]),
      ],
    });
  }

  submit() {
    this.hasError=false
    this.user=new User() ; 
    
    this.user.username=this.username; 
    
    this.user.password=this.password;
    
    this.authServe.login(this.user).subscribe(res=>{
      // this.router.navigateByUrl("/");

      console.log("probleme");
      
        this.userservice.getuserbyusername(this.user.username).subscribe((res1:User)=>{
          this.user = res1 ;
          
          this.userservice.connectedUser.next(res1) 
          localStorage.setItem("userConnected",this.username)
          

          document.location.reload();
          this.router.navigateByUrl("/");
        })
     },error=>{
       this.hasError=true
     }) 
      
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
