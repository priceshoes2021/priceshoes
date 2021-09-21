import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxEchartsModule } from "ngx-echarts";

import { ChartModule } from "angular2-chartjs";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Ng2SmartTableModule } from "ng2-smart-table";
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule,
  NbTooltipModule,
  NbActionsModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from "@nebular/theme";
import { EncuestaComponent } from "./encuesta.component";
import { AsignarEncuestaComponent } from "./asignar-encuestas/asignar-encuestas.component";
import { AplicarEncuestaComponent } from "./aplicar-encuestas/aplicar-encuestas.component";
import { InformesEncuestaComponent } from "./informes-encuestas/informes-encuestas.component";
import { GestionarEncuestaComponent } from "./gestionar-encuestas/gestionar-encuestas.component";
import { EncuestasRoutingModule } from "./encuestas-routing.module";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { ModalBienvenidaComponent } from "./aplicar-encuestas/modal-bienvenida/modal-bienvenida.component";
import { DemoMaterialModule } from "../../demo-material-module";

@NgModule({
  imports: [
    DemoMaterialModule,
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
    Ng2SmartTableModule,
    CommonModule,
    NbTooltipModule,
    NbActionsModule,
    ChartModule,
    NgxChartsModule,
    NgxEchartsModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbIconModule,
    NbInputModule,
    NbRadioModule,
    NbSelectModule,
  ],

  declarations: [
    EncuestaComponent,
    GestionarEncuestaComponent,
    AsignarEncuestaComponent,
    AplicarEncuestaComponent,
    InformesEncuestaComponent,
    ModalBienvenidaComponent,
  ],
  providers: [],
})
export class EncuestaModule {}
