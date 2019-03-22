import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomePageModule'
  },
  { path: 'lembretes', loadChildren: './pages/lembretes/lembretes.module#LembretesPageModule' },
  { path: 'contas', loadChildren: './pages/contas/contas.module#ContasPageModule' },
  { path: 'mercado', loadChildren: './pages/mercado/mercado.module#MercadoPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
