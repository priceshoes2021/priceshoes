import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EncuestaComponent } from './encuesta.component';
import { GestionarEncuestaComponent } from './gestionar-encuestas/gestionar-encuestas.component';
import { AsignarEncuestaComponent } from './asignar-encuestas/asignar-encuestas.component';
import { AplicarEncuestaComponent } from './aplicar-encuestas/aplicar-encuestas.component';
const routes: Routes = [{
    path: '',
    component: EncuestaComponent,
    children: [
        {
            path: 'aplicar-encuestas',
            component: AplicarEncuestaComponent,
        },
        {
            path: 'gestionar-encuestas',
            component: GestionarEncuestaComponent,
        },
        {
            path: 'asignar-encuestas',
            component: AsignarEncuestaComponent,
        },
    ],
}];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EncuestasRoutingModule {
}
