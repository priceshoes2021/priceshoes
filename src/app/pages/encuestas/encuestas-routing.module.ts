import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EncuestaComponent } from './encuesta.component';
import { GestionarEncuestaComponent } from './gestionar-encuestas/gestionar-encuestas.component';
import { AsignarEncuestaComponent } from './asignar-encuestas/asignar-encuestas.component';
import { AplicarEncuestaComponent } from './aplicar-encuestas/aplicar-encuestas.component';
import { InformesEncuestaComponent } from './informes-encuestas/informes-encuestas.component';
import { AuthGuard } from '../../auth/auth-guard/auth-guard.service';
import { AuthGuardRolAdmin } from '../../auth/auth-guard/auth-guard-rol.service';
import { AuthGuardRolAsesor } from '../../auth/auth-guard/auth-guard-rol-asesor';
import { AuthGuardRolDirectivo } from '../../auth/auth-guard/auth-guard-rol-directivo';
import { AuthGuardRolInvitado } from '../../auth/auth-guard/auth-guard-rol-invitado';
const routes: Routes = [{
    path: '',
    component: EncuestaComponent,
    children: [
        {
            path: 'aplicar-encuestas',
            component: AplicarEncuestaComponent,
            canActivate: [AuthGuard],

        },
        {
            path: 'gestionar-encuestas',
            component: GestionarEncuestaComponent,
            canActivate: [AuthGuard, AuthGuardRolDirectivo],
        },
        {
            path: 'asignar-encuestas',
            component: AsignarEncuestaComponent,
            canActivate: [AuthGuard, AuthGuardRolDirectivo],

        },
        {
            path: 'informes-encuestas',
            component: InformesEncuestaComponent,
            canActivate: [AuthGuard, AuthGuardRolDirectivo],
        },
    ],
}];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EncuestasRoutingModule {
}
