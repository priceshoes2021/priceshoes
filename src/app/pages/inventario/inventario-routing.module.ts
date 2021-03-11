import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventarioComponent } from './inventario.component';
/* import { GestionarEncuestaComponent } from './gestionar-encuestas/gestionar-encuestas.component'; */
import { RotacionComponent } from './rotacion/rotacion.component';

const routes: Routes = [{
    path: '',
    component: InventarioComponent,
    children: [
        {
            path: 'rotacion',
            component: RotacionComponent,
        }

    ],
}];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InventarioRoutingModule {
}
