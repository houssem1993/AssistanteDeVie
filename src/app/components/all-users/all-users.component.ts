import { Component, OnInit } from '@angular/core';
import { AllUsersService } from 'src/app/services/all-users.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  userTab:any=[] ;


  constructor( private userService:UsersService,
               private allUsersServices:AllUsersService) { }

  ngOnInit() {

    this.allUsersServices.getAllUsers().subscribe(
      (response)=>
      {
      this.userTab =response.users;
      }
    );
  }

}
