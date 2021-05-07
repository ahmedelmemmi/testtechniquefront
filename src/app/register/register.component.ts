import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  username: any;
  passwordexiste=false;
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
 

  // convenience getter for easy access to form fields
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
             Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
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
  // }
}
//    onSubmit() {
//     this.submitted = true;
//     localStorage.setItem("email",this.email);
//     localStorage.setItem("password",this.password);
//     localStorage.setItem("code_assure",this.code_assure)
    
   
//     if (this.registrationForm.invalid) {
//       alert('champ vide!! :-)\n\n' + JSON.stringify(this.registrationForm.value))
//     }else{


//  this.userservice.getAdherentbycode(localStorage.getItem("code_assure")).subscribe(res=>{
//    if (res !=null) {
//      this.adherentservice.getadherentbyEmail(localStorage.getItem("email")).subscribe(res2=>{
//        if(res2==false){
//          this.adherentservice.connectedUser.next(res); 
//          this.adherentservice.createcompte(localStorage.getItem("code_assure"),  
//          localStorage.getItem("password"), 
//          localStorage.getItem("email"), 0).subscribe(res=>{
//          this.adherentservice.Email.next(localStorage.getItem("email"))
//          this.router.navigateByUrl("/auth/noticepage")
         
//          }) 
//      }else{
//        this.hasError=true
//      }
//      })
//    }
//  })
//     }
//   }

}
