import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import {AuthGuard} from '../app/guards/auth.guard';
import {NologinGuard} from '../app/guards/nologin.guard'

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule',canActivate:[NologinGuard]},

 // { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'registro', loadChildren: './registro/registro.module#RegistroPageModule' },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule',canActivate:[AuthGuard]},
  { path: 'reporte', loadChildren: './reporte/reporte.module#ReportePageModule' },
  { path: 'noticias', loadChildren: './noticias/noticias.module#NoticiasPageModule' },
 
  { path: 'zonasinseguras', loadChildren: './zonasinseguras/zonasinseguras.module#ZonasinsegurasPageModule' },
  { path: 'reporte-enviado', loadChildren: './reporte-enviado/reporte-enviado.module#ReporteEnviadoPageModule' },
  { path: 'graficos', loadChildren: './graficos/graficos.module#GraficosPageModule' },
  { path: 'recontrasena', loadChildren: './recontrasena/recontrasena.module#RecontrasenaPageModule' },
 
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
