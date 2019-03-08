import { ContasPage } from './contas.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'contas',
        pathMatch: 'full'
      },
    {
        path: 'contas',
        component: ContasPage,
        children: [
            {
                path: 'faturas',
                loadChildren: './faturas/faturas.module#FaturasPageModule'
            },
            {
                path: 'luz',
                loadChildren: './luz/luz.module#LuzPageModule'
            },
            {
                path: 'nights',
                loadChildren: './nights/nights.module#NightsPageModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContasPageRoutingModule { }
