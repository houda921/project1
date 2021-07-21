import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChoicesPage } from './choices.page';

const routes: Routes = [
  {
    path: '',
    component: ChoicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChoicesPageRoutingModule {}
