import { NgModule } from '@angular/core';
import { ComprasComponent } from './compras.component';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule, NbUserModule,
} from '@nebular/theme';

@NgModule({
  imports: [

    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    

  ],
  declarations: [
    ComprasComponent,
  ],
  providers: [
 
  ],
})
export class ComprasModule { }
