import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook/ngx'
import { Login1Page } from './login1.page';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
const routes: Routes = [
  {
    path: '',
    component: Login1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[Facebook ,GooglePlus]
})
export class Login1PageRoutingModule {}
