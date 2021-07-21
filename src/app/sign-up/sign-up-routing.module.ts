import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms'
import { SignUpPage } from './sign-up.page';

const routes: Routes = [
  {
    path: '',
    component: SignUpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule], 
  providers:[FormBuilder]
})
export class SignUpPageRoutingModule {}
