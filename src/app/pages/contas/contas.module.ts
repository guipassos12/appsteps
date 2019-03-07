import { ContasPageRoutingModule } from './contas.router.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ContasPage } from './contas.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContasPageRoutingModule
  ],
  declarations: [ContasPage]
})
export class ContasPageModule {}
