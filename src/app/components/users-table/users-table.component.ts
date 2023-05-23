import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllUsersService } from 'src/app/services/all-users.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {

  userTab:any=[];
    
  constructor(private router:Router ,
              private userService:UsersService,
              private allUsersServices:AllUsersService) { }

  ngOnInit() {

    this.allUsersServices.getAllUsers().subscribe(
      (response)=>
      {
      this.userTab =response.users;
      }
    );
  }

  displayuser(id:number)
  {

    this.router.navigate([`userInfo/${id}`]);

  }

  deleteuser(id:number)
  {

    this.allUsersServices.deleteUser(id).subscribe(
      (response)=>
      {
        console.log(response.message);

        this.allUsersServices.getAllUsers().subscribe(
          (res)=>
          {
            this.userTab=res.users;
          }
        )
        
      }

    );
    
  }

}
