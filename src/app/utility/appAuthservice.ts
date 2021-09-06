import { Injectable } from '@angular/core';

import { KeycloakService, KeycloakAuthGuard } from 'keycloak-angular';
@Injectable({
    providedIn: 'root',
  })
export class AuthService
{
    constructor(private keycloakService : KeycloakService){}
    getLoggedUser()
    {
        try{
            let userDetails=this.keycloakService.getKeycloakInstance().idTokenParsed;
            console.log("userdetails:",userDetails)
            console.log("userRols:" ,this.keycloakService.getToken());
            return userDetails;

        }catch(e){
            console.log("getLoggedUser expectation",e)
            return undefined
        }

    }
    logout()
    {
        this.keycloakService.logout();
        
    }
    redirectToProfile()
    {
        this.keycloakService.getKeycloakInstance().accountManagement();

    }
    getRoles():any
    {
        return this.keycloakService.getUserRoles();
    }
}