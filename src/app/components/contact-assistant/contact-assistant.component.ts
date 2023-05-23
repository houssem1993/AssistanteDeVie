import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AllUsersService } from 'src/app/services/all-users.service';
import { DemandesService } from 'src/app/services/demandes.service';

@Component({
  selector: 'app-contact-assistant',
  templateUrl: './contact-assistant.component.html',
  styleUrls: ['./contact-assistant.component.css']
})
export class ContactAssistantComponent implements OnInit {

  contactForm:FormGroup;

  demande:any={};

  user:any={};

  idAssistant:any;

  id:any;

  status:string;


  constructor(private allUsersService:AllUsersService,
              private DemandeService:DemandesService,
              private activatedRouter:ActivatedRoute) { }

  ngOnInit() {

    this.idAssistant = this.activatedRouter.snapshot.paramMap.get("idAssistant");

     this.id = localStorage.getItem("id");

    this.allUsersService.getUserById(this.id).subscribe(
      (res)=>
      {
        this.user=res.findedUser;
      }
    );
    
  }

  sendDemande()
  
  {

    console.log(this.user);

    this.user.idAssistant=this.idAssistant;

    this.user.idUser=this.id;

    

    this.user.status="Attente";




    this.DemandeService.postDemande(this.user).subscribe(
      (res)=>
      {
        console.log("response from demande",res.message);

      }
    );
    


  }

}
