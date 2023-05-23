import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AllUsersService } from 'src/app/services/all-users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  SignupFormAdmin:FormGroup;

  pwdPattern = "^[a-z0-9_-]{8,15}$";

  phonePttern="[0-9 ]{8}";

  constructor(private formBuilder:FormBuilder,
              private allUseresService:AllUsersService,
              private router:Router) { }

  ngOnInit() {

    this.SignupFormAdmin = this.formBuilder.group({

      FirstName:["",[Validators.required,Validators.minLength(5)]],
      lastName:["",[Validators.required,Validators.minLength(5)]],
      tel:["",[Validators.required,Validators.pattern(this.phonePttern)]],
      email:["",[Validators.required,Validators.email]], 
      pwd:["",[Validators.required,Validators.pattern(this.pwdPattern)]],
      
       
  
     })
  }

  SignupAdmin()
  {

    this.SignupFormAdmin.value.role="admin"

    console.log("admin object",this.SignupFormAdmin.value);

    this.allUseresService.signupAdmin(this.SignupFormAdmin.value).subscribe(
      (data)=>
      {
        console.log("response of admin",data.message);

        this.router.navigate(["admin"]);
        
      }
    );
    

  }

}
