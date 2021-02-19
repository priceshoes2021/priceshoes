import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GestionarEncuestaComponent } from './gestionar-encuestas/gestionar-encuestas.component';
import { EncuestasRoutingModule } from './encuestas-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule, NbUserModule,
} from '@nebular/theme';
import { EncuestaComponent } from './encuesta.component';
import { AsignarEncuestaComponent } from './asignar-encuestas/asignar-encuestas.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    EncuestasRoutingModule,
    Ng2SmartTableModule
  ],
  declarations: [
    EncuestaComponent,
    GestionarEncuestaComponent,
    AsignarEncuestaComponent
  ],
  providers: [
  ],
})
export class EncuestaModule { }
