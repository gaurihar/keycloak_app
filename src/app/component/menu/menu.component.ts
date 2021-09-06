import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {KeycloakService} from 'keycloak-angular'
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isDefault:boolean=false
  isGoogle:boolean=false
  isKibana:boolean=false
  isGraphana:boolean=false
  userRoles:any=[]
  googleLink: any = 'https://www.google.com'


  // constructor(public sanitizer: DomSanitizer) {
  //   this.sanitizer = sanitizer;   
  // }
  constructor(private route: ActivatedRoute,
    private router: Router, private keycloakService: KeycloakService) { }

  ngOnInit(): void {
    this.getLoggedUser()
    this.userRole()
  }

  // getLink(){
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(this.googleLink);
  // }
  kibanaSet(){
  this.isDefault=false
  this.isGoogle=false
  this.isKibana=true
  this.isGraphana=false


  }
  googleSet()
  {
    this.isDefault=false
    this.isGoogle=true
    this.isKibana=false
    this.isGraphana=false
    
  }

  graphanaSet()
  {
    this.isDefault=false
    this.isGoogle=false
    this.isKibana=false
    this.isGraphana=true
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
