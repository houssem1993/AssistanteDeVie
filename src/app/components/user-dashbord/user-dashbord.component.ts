import { Component, OnInit } from '@angular/core';
import { AllUsersService } from 'src/app/services/all-users.service';
import { DemandesService } from 'src/app/services/demandes.service';

@Component({
  selector: 'app-user-dashbord',
  templateUrl: './user-dashbord.component.html',
  styleUrls: ['./user-dashbord.component.css']
})
export class UserDashbordComponent implements OnInit {

  demandeTab:any=[];

  demandetabfinal:any=[]

  AssistantTab:any={};

  idx:any={}
  
  Assistant:any={};

  constructor(private DemandeService:DemandesService , 
            private userService:AllUsersService) { }

  ngOnInit() {

    this.DemandeService.getAllDemande().subscribe(
      (data)=>
      {
        this.demandetabfinal=data.demandeTab
         
        console.log("tab demande",this.demandetabfinal);
        
      }
    );



     this.idx = localStorage.getItem("id") ;


    this.DemandeService.getDemande(this.idx).subscribe(
      (res)=>
      {
        this.AssistantTab=res.allDemande

        console.log("tab assistants",this.AssistantTab);
        
      }
    );
    
     
  }



  

}
