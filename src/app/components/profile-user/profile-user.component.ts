import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AllUsersService } from 'src/app/services/all-users.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {

  profileForm:FormGroup;

  idUser:any;

  user:any={};

  newUser:any={}

  userTab:any=[]

  constructor( private allUsersServices:AllUsersService,
              private router:Router) { }

  ngOnInit() {

    this.idUser=localStorage.getItem("id");
    console.log(this.idUser);

    this.allUsersServices.getUserById(this.idUser).subscribe(
      (res)=>
      {
       this.user=res.findedUser
      }
    );


    


  }

  EditProfile()
  {
    console.log("here is new user ",this.user);

    this.allUsersServices.editAssistant(this.user).subscribe(
      (response)=>
      {
        console.log("edit user",response.message);
        this.allUsersServices.getAllUsers().subscribe(
          (doc)=>
          {
           this.userTab =doc.users
          }
        );
        this.router.navigate([""]);
        
      }
    );


  }

}
