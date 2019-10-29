import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'registro', loadChildren: './registro/registro.module#RegistroPageModule' },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
  { path: 'reporte', loadChildren: './reporte/reporte.module#ReportePageModule' },
  { path: 'noticias', loadChildren: './noticias/noticias.module#NoticiasPageModule' },
  { path: 'estadisticas', loadChildren: './estadisticas/estadisticas.module#EstadisticasPageModule' },
  { path: 'zonasinseguras', loadChildren: './zonasinseguras/zonasinseguras.module#ZonasinsegurasPageModule' },
  { path: 'reporte-enviado', loadChildren: './reporte-enviado/reporte-enviado.module#ReporteEnviadoPageModule' },
  { path: 'todo-details', loadChildren: './pages/todo-details/todo-details.module#TodoDetailsPageModule' },
  { path: 'details/:id', loadChildren:'./pages/todo-details/todo-details.module#TodoDetailsPageModule'},
  { path: 'details', loadChildren:'./pages/todo-details/todo-details.module#TodoDetailsPageModule'},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
