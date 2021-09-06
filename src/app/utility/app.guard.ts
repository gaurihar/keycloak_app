// import { Injectable } from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   Router,
//   RouterStateSnapshot,
// } from '@angular/router';
// import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard extends KeycloakAuthGuard {
//   constructor(
//     protected readonly router: Router,
//     protected readonly keycloak: KeycloakService
//   ) {
//     super(router, keycloak);
//   }

//   public async isAccessAllowed(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ):Promise<boolean> {
//     // Force the user to log in if currently unauthenticated.
//     if (!this.authenticated) {
//       await this.keycloak.login({
//         redirectUri: window.location.origin + state.url,
//       });
//     }

//     // Get the roles required from the route.
//     const requiredRoles = route.data.roles;

//     // Allow the user to to proceed if no additional roles are required to access the route.
//     if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
//       return true;
//     }

//     // Allow the user to proceed if all the required roles are present.
//     return requiredRoles.every((role) => this.roles.includes(role));
//   }
// }

import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { KeycloakService, KeycloakAuthGuard } from 'keycloak-angular';

@Injectable()
export class AppAuthGuard extends KeycloakAuthGuard {
  constructor(
    protected router: Router,
    protected keycloakAngular: KeycloakService
  ) {
    super(router, keycloakAngular);
  }

  isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
    let permission;
      if (!this.authenticated) {
        this.keycloakAngular.login().catch((e) => console.error(e));
        console.log("hiiii login")
        console.log(this.roles)
        return reject(false);
      }

      const requiredRoles: string[] = route.data.roles;
      console.log(route.data.roles)
      if (!requiredRoles || requiredRoles.length === 0) {
        permission = true;
      } else {
        if (!this.roles || this.roles.length === 0) {
        permission = false
        }
        if (requiredRoles.every((role) => this.roles.indexOf(role) > -1))
        {
            permission=true;
        } else {
            permission=false;
        };
      }
      if(!permission){
          this.router.navigate(['/']);
      }
      resolve(permission)
    });
  }
}