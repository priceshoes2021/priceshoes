
import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbTabsetModule,NbUserModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';

import { VisitantesComponent } from './visitantes.component';


@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    NbTabsetModule,
    NbUserModule,

  ],
  declarations: [
    VisitantesComponent,

  ],
})
export class VisitantesModule { }
