import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule, NbUserModule,
  NbTooltipModule,
} from '@nebular/theme';

import { RotacionComponent } from './rotacion/rotacion.component';
import { InventarioRoutingModule } from './inventario-routing.module';
import { InventarioComponent } from './inventario.component';



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
    
  

  ],

  declarations: [
    /* RotacionComponent */
    InventarioComponent,
    RotacionComponent
  ],
  providers: [
  ],
})
export class InventarioModule { }
