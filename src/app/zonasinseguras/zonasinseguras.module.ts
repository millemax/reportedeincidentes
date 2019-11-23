import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ZonasinsegurasPage } from './zonasinseguras.page';

import { CalendarModule } from "ion2-calendar";

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
    RouterModule.forChild(routes),
    CalendarModule,
  ],
  declarations: [ZonasinsegurasPage]
})
export class ZonasinsegurasPageModule {}
