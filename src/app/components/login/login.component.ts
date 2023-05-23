import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllUsersService } from 'src/app/services/all-users.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMsg:string;

  loginForm:FormGroup;

  pwdPattern = "^[a-z0-9_-]{8,15}$";

  constructor(private formBuilder:FormBuilder ,
              private router: Router ,
              private allUsersServices:AllUsersService) { }

  ngOnInit() {

    this.loginForm= this.formBuilder.group({

      email:["",[Validators.required,Validators.email]],
      pwd:["",[Validators.required,Validators.pattern(this.pwdPattern)]],
     
      
  })} 


  Login()
  {

    

      console.log("here login object",this.loginForm.value);

      let user=this.loginForm.value;

    this.allUsersServices.login(user);
    // .subscribe(
      // (response)=>
      // {
        // console.log("response after login",response.user);
        // if (response.message=="welcome") {

        //   this.router.navigate([""]);
          
        // } else {

        //   this.errorMsg =" please check email/pwd" ;
          
        // }
        
      // }
    // );


      
    

    



    // let assistantTab = JSON.parse(localStorage.getItem("Assistants")||"[]");

    // for (let i = 0; i < assistantTab.length; i++) {

    //    if (assistantTab[i].email==object.email && assistantTab[i].pwd==object.pwd) {

    //     if (assistantTab[i].role=="assistant") {

    //       this.router.navigate([""]);
          
    //     } else {

    //       this.router.navigate([""]);
          
          
    //     }
        
    //    }
      
    // }
    
  }

}
