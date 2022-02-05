import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TreeprofilePage } from './treeprofile.page';

const routes: Routes = [
  {
    path: '',
    component: TreeprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TreeprofilePageRoutingModule {}
