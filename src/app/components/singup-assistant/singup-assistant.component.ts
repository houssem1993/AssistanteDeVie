import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllUsersService } from 'src/app/services/all-users.service';
import { AssistantService } from 'src/app/services/assistant.service';
import { geneateId } from 'src/app/shared/genenricFunction';

@Component({
  selector: 'app-singup-assistant',
  templateUrl: './singup-assistant.component.html',
  styleUrls: ['./singup-assistant.component.css']
})
export class SingupAssistantComponent implements OnInit {

  singupForm:FormGroup;

  path:string;

  cvPreview:any;

  pwdPattern = "^[a-z0-9_-]{8,15}$";

  phonePttern="[0-9 ]{8}" ;

  msgError:string;

  constructor(private formBuilder:FormBuilder ,
             private router:Router , 
            
             private allUsersServices:AllUsersService) { }

  ngOnInit() {

    this.path=this.router.url;

   this.singupForm= this.formBuilder.group({

      FirstName:["",[Validators.required,Validators.minLength(5)]],
      lastName:["",[Validators.required,Validators.minLength(5)]],
      pwd:["",[Validators.required,Validators.pattern(this.pwdPattern)]],
      tel:["",[Validators.required,Validators.pattern(this.phonePttern)]],
      email:["",[Validators.required,Validators.email]],
      adresse:["",[Validators.required,Validators.minLength(10)]],
      birthDay:["",[Validators.required]],
      cv:[""],
      

    })
  }

  SignupAssistant()
  {

    this.singupForm.value.role = "assistant";
    this.singupForm.value.status = "NOT CONFIRMED";

    
    console.log("here is signup assistant",this.singupForm.value);

    this.allUsersServices.signupAssistant(this.singupForm.value,this.singupForm.value.cv).subscribe(
      (response)=>
      {
        console.log("response",response.message);

        

          this.router.navigate(["signin"]);

        
        
      }
    );

   
    
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.singupForm.patchValue({ cv: file });
    this.singupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.cvPreview = reader.result as string
    };
    reader.readAsDataURL(file);
    }

 
 
}
