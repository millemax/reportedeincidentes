import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RecontrasenaPage } from './recontrasena.page';

const routes: Routes = [
  {
    path: '',
    component: RecontrasenaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RecontrasenaPage]
})
export class RecontrasenaPageModule {}
