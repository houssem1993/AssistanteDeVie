import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllUsersService } from 'src/app/services/all-users.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  oneUser:any={};

  userTab:any=[];

  id:any;


  constructor( private activatedRoute:ActivatedRoute ,
              
              private allUsersServices:AllUsersService) { }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get("id");

    this.allUsersServices.getUserById(this.id).subscribe(
      (response)=>
      {
        this.oneUser=response.findedUser
      }
    );

    // for (let i = 0; i < this.userTab.length; i++) {

    //   if (this.userTab[i].id==this.id) {

    //     this.oneUser= this.userTab[i] ;

    //     break ;
        
    //   }
      
      
    // }

  }

}
