import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AllUsersService } from 'src/app/services/all-users.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userIsAuthenticated = false;
  user: any;

  token: any;

  decodeToken: any;

  userRole: any;
  private authListenerSubs: Subscription;
  constructor(private allUserService: AllUsersService) {

  }



  ngOnInit() {


  



    this.authListenerSubs = this.allUserService.getAuthStatusListener().subscribe(
      isAuthenticated => {
        this.token =localStorage.getItem("token");
        console.log("here token", this.token);
        this.userIsAuthenticated = isAuthenticated;
        this.user = this.allUserService.getName();

        if (this.userIsAuthenticated) {

          
          this.decodeToken = jwt_decode(this.token)
          console.log(this.decodeToken);
          console.log("here role :", this.decodeToken.role);
          this.userRole = this.decodeToken.role;
        }





      
      }
    )
  }



  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  logout() {
    this.allUserService.logout();
  }



}
