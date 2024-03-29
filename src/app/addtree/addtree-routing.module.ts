import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AddtreePage } from './addtree.page';

const routes: Routes = [
  {
    path: '',
    component: AddtreePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes) ,FormsModule],
  exports: [RouterModule ,FormsModule],
})
export class AddtreePageRoutingModule {}
