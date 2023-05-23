import { Component, OnInit } from '@angular/core';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AllUsersService } from 'src/app/services/all-users.service';
import { AssistantService } from 'src/app/services/assistant.service';

@Component({
  selector: 'app-assistant-info',
  templateUrl: './assistant-info.component.html',
  styleUrls: ['./assistant-info.component.css']
})
export class AssistantInfoComponent implements OnInit {

  assistant:any={};

  assistantTab:any=[];

  id:any;

  cvAssistant:any;

  constructor(private activatedRouter:ActivatedRoute ,
              private router:Router,
              private allUsersServices:AllUsersService ,
              private domSantizer:DomSanitizer) { }

  ngOnInit() {

    // this.assistantTab=JSON.parse(localStorage.getItem("Assistants")||"[]")

    

    this.id = this.activatedRouter.snapshot.paramMap.get("id");

    this.allUsersServices.getAssistantById(this.id).subscribe(
      (data)=>
      {
        this.assistant=data.findedAssistant;
        this.cvAssistant=this.domSantizer.bypassSecurityTrustResourceUrl(data.findedAssistant.cv);
        console.log(this.cvAssistant);
        
      }
    );

  //   for (let i = 0; i < this.assistantTab.length; i++) {
  //     if (this.assistantTab[i].id ==this.id ) {

  //       this.assistant=this.assistantTab[i] ;

  //       break ;
        
  //     }
      
  //   }
  // }

}

contactAssistant()
{

  

  this.router.navigate([`contactAssistants/${this.id}`]);

}
}
