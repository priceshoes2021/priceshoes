
import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbTabsetModule,NbUserModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';

import { VisitantesComponent } from './visitantes.component';
import { InformesVisitanteComponent } from './informes/informes-visitante.component';
import { VisitanteRoutingModule } from './visitantes-routing.modules';


@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    NbTabsetModule,
    NbUserModule,
    VisitanteRoutingModule
  ],
  declarations: [
    VisitantesComponent,
    InformesVisitanteComponent

  ],
})
export class VisitantesModule { }
