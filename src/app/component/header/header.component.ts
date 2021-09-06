import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import {AuthService} from '../../utility/appAuthservice'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userRoles:any=[]

  constructor(private route: ActivatedRoute,
    private router: Router, private keycloakService: KeycloakService) { }

  ngOnInit() {
    // this.getLoggedUser()
    // this.userRole()
  }

  logout() {
    this.keycloakService.logout();
  }

  getLoggedUser()
    {
        try{
            let userDetails=this.keycloakService.getKeycloakInstance().idTokenParsed;
            console.log("userdetails:",userDetails)
            console.log("userToken:" ,this.keycloakService.getToken());
            return userDetails;

        }catch(e){
            console.log("getLoggedUser expectation",e)
            return undefined
        }

    }

    userRole()
    {
     //console.log(this.keycloakService.getUserRoles())
     this.userRoles=this.keycloakService.getUserRoles()
     console.log(this.userRoles)
    }

}
