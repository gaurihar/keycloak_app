import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './component/menu/menu.component'
import {GoogleComponent} from './component/google/google.component'
import {AppAuthGuard} from '../app/utility/app.guard'
import {KibanaComponent} from './component/kibana/kibana.component'


const routes: Routes = [
//  {path:'' ,redirectTo:'menu',pathMatch:'full'},
  {path:'menu',component:MenuComponent},
  {path:'google',canActivate:[AppAuthGuard],component:GoogleComponent,  data: { roles: ['users'] }
},
{path:'kibana',canActivate:[AppAuthGuard],component:KibanaComponent,data: { roles: ['users']}
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
