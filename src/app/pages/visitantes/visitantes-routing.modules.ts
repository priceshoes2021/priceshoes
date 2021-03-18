
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InformesVisitanteComponent } from './informes/informes-visitante.component';
import { VisitantesComponent } from './visitantes.component';

const routes: Routes = [{
    path: '',
    component: VisitantesComponent,
    children: [
        {
            path: 'visitante',
            component: InformesVisitanteComponent,
        },
        {
            path: 'informe-visitante',
            component: InformesVisitanteComponent,
        },

    ],
}];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class VisitanteRoutingModule {
}
