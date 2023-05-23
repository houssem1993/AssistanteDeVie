import { Component, OnInit } from '@angular/core';
import { DemandesService } from 'src/app/services/demandes.service';

@Component({
  selector: 'app-demande-table',
  templateUrl: './demande-table.component.html',
  styleUrls: ['./demande-table.component.css']
})
export class DemandeTableComponent implements OnInit {

  demandeTab:any=[];

 
  idconnected:string;
  role:string;
  demande:any={};

  constructor(private DemandeService:DemandesService) { }

  ngOnInit() {

    this.role=localStorage.getItem("role");

    if (this.role=="assistant") {


      this.idconnected=localStorage.getItem("id");

    this.DemandeService.getDemandeByAssistant(this.idconnected).subscribe(
      (response)=>
      {
        this.demandeTab=response.demandeTab
      }
      
    );
      
      
    } else {

      

      this.DemandeService.getAllDemande().subscribe(
        (res)=>
        {
          this.demandeTab=res.demandeTab
        }
      );
      
      
    }

    



  

    
  }

  confirmedDemande(id:number)
  {

    alert("accept"+id);

    this.DemandeService.getDemandeById(id).subscribe(
      (response)=>
      {
        this.demande=response.demande
        console.log(this.demande);

        this.demande.status="accept";

        this.DemandeService.editDemande(this.demande).subscribe(
          (res)=>
          {
            console.log("response",res.message);
            
          }
        )
        
      }
    )

  }

  refusedDemande(id:number)
  {

    alert("decline")

    this.DemandeService.getDemandeById(id).subscribe(
      (response)=>
      {
        this.demande=response.demande
        console.log(this.demande);

        this.demande.status="decline";

        this.DemandeService.editDemande(this.demande).subscribe(
          (res)=>
          {
            console.log("response",res.message);
            
          }
        )
        
      }
    )
  }

}
