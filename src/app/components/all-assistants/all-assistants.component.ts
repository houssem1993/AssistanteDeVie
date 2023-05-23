import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllUsersService } from 'src/app/services/all-users.service';
import { AssistantService } from 'src/app/services/assistant.service';

@Component({
  selector: 'app-all-assistants',
  templateUrl: './all-assistants.component.html',
  styleUrls: ['./all-assistants.component.css']
})
export class AllAssistantsComponent implements OnInit {

  assistantTab:any=[ ] ;
  assistantTabc:any=[]

  constructor(private router:Router,
              
              private allUsersServices:AllUsersService) { }

  ngOnInit() {

    // this.assistantTab=JSON.parse(localStorage.getItem("Assistants")||"[]")

    this.allUsersServices.getAllAssistantsConfirmed().subscribe(
      (response)=>

      {
        this.assistantTab=response.assistantsConfirmed;

        
      }
    );
  }

  displayAll()
  {

    this.router.navigate(["ourAssistants"]);
    
  }



}
