import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TreeprofilePageRoutingModule } from './treeprofile-routing.module';

import { TreeprofilePage } from './treeprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TreeprofilePageRoutingModule
  ],
  declarations: [TreeprofilePage]
})
export class TreeprofilePageModule {}
