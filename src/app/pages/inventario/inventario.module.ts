import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

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
  NbUserModule,
  NbTooltipModule,
} from "@nebular/theme";
import { ThemeModule } from "../../@theme/theme.module";
import {
  RotacionComponent,
  FsIconComponent,
} from "./rotacion/rotacion.component";
import { InventarioRoutingModule } from "./inventario-routing.module";
import { InventarioComponent } from "./inventario.component";
import { NbIconModule, NbInputModule, NbTreeGridModule } from "@nebular/theme";
import { FilterPipe } from '../../config/pipes/filter.pipe';

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
    InventarioRoutingModule,
    Ng2SmartTableModule,
    CommonModule,
    NbTooltipModule,
    ThemeModule,
    NbIconModule,
    NbInputModule,
    NbTreeGridModule,
  ],

  declarations: [
    /* RotacionComponent */
    InventarioComponent,
    RotacionComponent,
    FsIconComponent,
    FilterPipe
  ],
  providers: [],
})
export class InventarioModule {}
