import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllUsersService } from 'src/app/services/all-users.service';
import { AssistantService } from 'src/app/services/assistant.service';

@Component({
  selector: 'app-our-assistants',
  templateUrl: './our-assistants.component.html',
  styleUrls: ['./our-assistants.component.css']
})
export class OurAssistantsComponent implements OnInit {

  assistant:any={};

  assistantTab:any=[] ;

  id:any;

  constructor(private router : Router ,
              private activatedRoute: ActivatedRoute,
              private assistantService:AssistantService,
              private allUsersServices:AllUsersService) { }

  ngOnInit() {

    // this.assistantTab=JSON.parse(localStorage.getItem("Assistants")||"[]")

    this.allUsersServices.getAllAssistants().subscribe(
      (response)=>
      {
        this.assistantTab=response.assistants;
      }
    );

    this.id=this.activatedRoute.snapshot.paramMap.get("id");

    // for (let i = 0; i < this.assistantTab.length; i++) {

    //   if (this.assistantTab[i].id==this.id) {

    //     this.assistant=this.assistantTab[i] ;

    //     break ;

        
        
    //   }
      
      
    // }

  }

  moreInfo(id:number)
  
  {
       this.router.navigate([`AssistantInfo/${id}`])
  }

}
