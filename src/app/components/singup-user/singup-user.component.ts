import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllUsersService } from 'src/app/services/all-users.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-singup-user',
  templateUrl: './singup-user.component.html',
  styleUrls: ['./singup-user.component.css']
})
export class SingupUserComponent implements OnInit {

  SignupFormUser:FormGroup;

  imagePreview:any;

  pwdPattern = "^[a-z0-9_-]{8,15}$";

  phonePttern="[0-9 ]{8}"

  constructor(private formBuilder:FormBuilder ,
              private router : Router ,
              private userService:UsersService,
              private allUsersServices:AllUsersService) { }

  ngOnInit() {
    
   this.SignupFormUser= this.formBuilder.group({

    FirstName:["",[Validators.required,Validators.minLength(5)]],
      lastName:["",[Validators.required,Validators.minLength(5)]],
      pwd:["",[Validators.required,Validators.pattern(this.pwdPattern)]],
      tel:["",[Validators.required,Validators.pattern(this.phonePttern)]],
      email:["",[Validators.required,Validators.email]],
      adresse:["",[Validators.required,Validators.minLength(10)]],
      birthDay:["",[Validators.required]],
      img:[""]
     

   })
  }

  SignupUser(){

    this.SignupFormUser.value.role="user";

    console.log("here is signup User",this.SignupFormUser.value);

this.allUsersServices.signupUser(this.SignupFormUser.value,this.SignupFormUser.value.img).subscribe(
  (response)=>
  {
    console.log("here is response",response.message);
    
  }
)

    this.router.navigate(["signin"]);

    

  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.SignupFormUser.patchValue({ img: file });
    this.SignupFormUser.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
    }

}
