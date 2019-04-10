import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LuzPage } from './luz.page';
import { LuzModalPage } from './../../modals/luz-modal/luz-modal.page';


const routes: Routes = [
  {
    path: '',
    component: LuzPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LuzPage, LuzModalPage],
  entryComponents: [LuzModalPage]
})
export class LuzPageModule { }
