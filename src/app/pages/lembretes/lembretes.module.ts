import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LembretesPage } from './lembretes.page';
import { LembretesModalPage } from './../../modals/lembretes-modal/lembretes-modal.page';

const routes: Routes = [
  {
    path: '',
    component: LembretesPage
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
  declarations: [LembretesPage, LembretesModalPage],
  entryComponents: [LembretesModalPage],
})
export class LembretesPageModule { }
