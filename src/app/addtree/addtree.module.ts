import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddtreePageRoutingModule } from './addtree-routing.module';

import { AddtreePage } from './addtree.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddtreePageRoutingModule , 
    ReactiveFormsModule ,
  ],
  declarations: [AddtreePage]
})
export class AddtreePageModule {}
