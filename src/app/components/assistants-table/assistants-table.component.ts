import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllUsersService } from 'src/app/services/all-users.service';
import { AssistantService } from 'src/app/services/assistant.service';


@Component({
  selector: 'app-assistants-table',
  templateUrl: './assistants-table.component.html',
  styleUrls: ['./assistants-table.component.css']
})
export class AssistantsTableComponent implements OnInit {

  assistantTab:any=[ ] ;

  assistant:any={};



  

  constructor(private router:Router ,
              private assistantService:AssistantService,
              private allUsersServices:AllUsersService) { }

  ngOnInit() {

    //  this.assistantTab = JSON.parse(localStorage.getItem("Assistants")||"[]");

    this.allUsersServices.getAllAssistants().subscribe(
      (response)=>
      {
        this.assistantTab=response.assistants;
      }
    );


  }

  confirmedAssistant(id:number)
  {

    alert("confirmed " +id);

    this.allUsersServices.getAssistantById(id).subscribe(
      (res)=>
      {
        this.assistant=res.findedAssistant ;

        console.log("assistant a confirmer:",this.assistant);

        

        this.assistant.status="confirmed";

        

        this.allUsersServices.editAssistant(this.assistant).subscribe(
          (doc)=>
          {
            console.log(doc.message);
            
          }
        );
        


      }
    );
  }

  refusedAssistant(id:number)
  {
    
    alert("refused " +id);

    this.allUsersServices.getAssistantById(id).subscribe(
      (res)=>
      {
        this.assistant=res.findedAssistant ;

        console.log("assistant a confirmer:",this.assistant);

        this.assistant.status="Refused";

        

        this.allUsersServices.editAssistant(this.assistant).subscribe(
          (doc)=>
          {
            console.log(doc.message);
            
          }
        );
        


      }
    );
  }

  displayAssistant(id:number)
  {

    this.router.navigate([`AssistantInfo/${id}`])
  }

  deleteAssistant(id:number)
  {

   this.allUsersServices.deleteAssistantById(id).subscribe(
    (data)=>
    {
      console.log("response after delete",data.message);

      this.allUsersServices.getAllAssistants().subscribe(
        (response)=>
        {
          this.assistantTab=response.assistants
        }
      );
      
    }

    
   );

  }

  editAssistant(id:number)
  {

    this.router.navigate([`editAssistant/${id}`])
  }

}
