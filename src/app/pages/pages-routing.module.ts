import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { ComprasComponent } from './compras/compras.component';
import { VisitantesComponent } from './visitantes/visitantes.component';
import { VisitantesModule } from './visitantes/visitantes.module';
import { AuthGuard } from '../auth/auth-guard/auth-guard.service';
import { AuthGuardRolAdmin } from '../auth/auth-guard/auth-guard-rol.service';
import { AuthGuardRolAsesor } from '../auth/auth-guard/auth-guard-rol-asesor';
import { AuthGuardRolDirectivo } from '../auth/auth-guard/auth-guard-rol-directivo';
import { AuthGuardRolInvitado } from '../auth/auth-guard/auth-guard-rol-invitado';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'compras',
      component: ComprasComponent,
    },
    {
      path: 'visitantes',
      component: VisitantesComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'visitantes',
      canActivate: [AuthGuard, AuthGuardRolAdmin], 
      loadChildren: () => import('./visitantes/visitantes.module')
        .then(m => m.VisitantesModule),
    }, 
     {
      path: 'encuestas',
      canActivate: [AuthGuard], 
      loadChildren: () => import('./encuestas/encuesta.module')
        .then(m => m.EncuestaModule),
    }, 
     {
      path: 'inventario',
      canActivate: [AuthGuard, AuthGuardRolAdmin], 
      loadChildren: () => import('./inventario/inventario.module')
        .then(m => m.InventarioModule),
    },  
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    
    {
      path: '',
      redirectTo: 'encuestas/aplicar-encuestas',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
