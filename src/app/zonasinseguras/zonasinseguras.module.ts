import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ZonasinsegurasPage } from './zonasinseguras.page';

const routes: Routes = [
  {
    path: '',
    component: ZonasinsegurasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ZonasinsegurasPage]
})
export class ZonasinsegurasPageModule {}
