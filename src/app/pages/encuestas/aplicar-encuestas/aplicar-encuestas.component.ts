import { Component, ViewChild, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';
import { SmartTableData } from '../../../@core/data/smart-table';
import { DialogNamePromptComponent } from '../../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component';
import { ShowcaseDialogComponent } from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { NbDialogService } from '@nebular/theme';
import { SERVICES } from "../../../config/webservices";
import { ServicesProvider } from "../../../config/services";
@Component({
    selector: 'ngx-accordion',
    templateUrl: 'aplicar-encuestas.component.html',
    styleUrls: ['aplicar-encuestas.component.scss'],
})
export class AplicarEncuestaComponent implements OnInit{

    constructor(private service: SmartTableData, private dialogService: NbDialogService,private ServicesProvider: ServicesProvider) {
    }
 

    ngOnInit(){
        this.fn_listarEncuestasAsignadas();
    }
    encuestasAsignadas
    fn_listarEncuestasAsignadas(){
      
  
      this.ServicesProvider.get(SERVICES.LISTAR_ENCUESTAS_ASIGNADAS, {}).then(response => {
  
        this.encuestasAsignadas = response
        console.log(response);
  
      });
  
    }


}
