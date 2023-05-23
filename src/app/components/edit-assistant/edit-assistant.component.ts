import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AllUsersService } from 'src/app/services/all-users.service';
import { AssistantService } from 'src/app/services/assistant.service';

@Component({
  selector: 'app-edit-assistant',
  templateUrl: './edit-assistant.component.html',
  styleUrls: ['./edit-assistant.component.css']
})
export class EditAssistantComponent implements OnInit {

  singupForm:FormGroup;

  assistant:any={};

  assistantTab:any=[];



  id:any={}

  constructor(private activatedRout :ActivatedRoute ,
              private router :Router ,
              private assistantService:AssistantService,
              private allUsersServices:AllUsersService) { }

  ngOnInit() {

    this.id=this.activatedRout.snapshot.paramMap.get("id");

    this.allUsersServices.getAssistantById(this.id).subscribe(
      (response)=>
      {
        this.assistant=response.findedAssistant
      }
    );



    // this.assistantTab = JSON.parse(localStorage.getItem("Assistants")||"[]");

    // for (let i = 0; i < this.assistantTab.length; i++) {
    //   if (this.assistantTab[i].id == this.id) {

    //     this.assistant=this.assistantTab[i] ;

    //     break ;
        
    //   }
      
    // }

  }

  EditAssistant()
  {

    console.log("here is new assistants ",this.assistant);

    this.allUsersServices.editAssistant(this.assistant).subscribe(
      (response)=>
      {
        console.log("edit assistant",response.message);
        this.allUsersServices.getAllAssistants().subscribe(
          (doc)=>
          {
           this.assistantTab =doc.assistants
          }
        );
        this.router.navigate(["admin"]);
        
      }
    );


    // for (let i = 0; i < this.assistantTab.length; i++) {

    //   if (this.assistantTab[i].id == this.id) {

    //     this.assistantTab[i]== this.assistant ;

    //     break
        
    //   }
      
      
    // }

    // localStorage.setItem("Assistants",JSON.stringify(this.assistantTab)) ;

   
    

  }

}
