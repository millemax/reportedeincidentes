import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReporteEnviadoPage } from './reporte-enviado.page';

const routes: Routes = [
  {
    path: '',
    component: ReporteEnviadoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReporteEnviadoPage]
})
export class ReporteEnviadoPageModule {}
