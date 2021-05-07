import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../Services/AuthService';
import { UserService } from '../Services/UserService';
import { User } from '../models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  hasError: boolean;
  isLoading$: Observable<boolean>;
  user: User = {
    id: "",
    username: '',
    password: '',
    email: '',
    telephone: '',
    DateNaissance: new Date(),
    created_at: new Date(),
  };

  
  username: any;
  submitted: boolean;
  password: any;
  email: any;
  telephone:any;
  DateNaissance: any;
  formError
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,

    private userservice:UserService,
  ) {
    this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    if (this.authService.currentuserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
     this.initForm();
  }
 

  get f() {
    return this.registerForm.controls;
  }

   initForm() {
     this.registerForm = this.fb.group(
       {
        username: [
          this.username,
           Validators.compose([
             Validators.required,
             Validators.minLength(3),
             Validators.maxLength(100),
           ]),
         ],
         password: [
          this.password,
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(100)
          ]),
          
        ],
         email: [
          this.email,
           Validators.compose([
             Validators.required,
             Validators.email,
             Validators.minLength(3),
             Validators.maxLength(320)
           ]),
         ],
         
         telephone: [
          this.telephone,
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(100)
          ]),
          
        ],
        DateNaissance: [
          this.DateNaissance,
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(100)
          ]),
          
        ]
      
       }
     );
   }
   onSubmit() {
    this.user.username=this.username;
    this.user.password=this.password;
    this.user.email=this.email;
    this.user.telephone=this.telephone;
    this.user.DateNaissance=this.DateNaissance;

    this.userservice.createcompte(this.user)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/']);
        },
        err => console.error(err)
      )
 
}
}
