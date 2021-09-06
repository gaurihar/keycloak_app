import {KeycloakService} from 'keycloak-angular'
import { KeycloakPromiseCallback } from 'keycloak-js';

export function initializeKeycloak(keycloak: KeycloakService):()=>Promise<boolean> {
    return () =>
      keycloak.init({
        config: {
          url: 'http://localhost:8080/auth',
          realm: 'angular-web',
          clientId: 'angular-web-clinet',
        },
        initOptions:
        {
            checkLoginIframe:true,
            checkLoginIframeInterval:25
        }
       
      });
  }