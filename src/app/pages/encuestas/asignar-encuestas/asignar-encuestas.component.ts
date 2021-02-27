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
  templateUrl: 'asignar-encuestas.component.html',
  styleUrls: ['asignar-encuestas.component.scss'],
})
export class AsignarEncuestaComponent implements OnInit {


  
  names: string[] = [];
  source: LocalDataSource = new LocalDataSource();
  data = [];
  encuestas =[]
  constructor(private service: SmartTableData, private dialogService: NbDialogService, private ServicesProvider: ServicesProvider) {
    /* const data = this.service.getData(); */


    console.log(this.encuestas)
  }

  ngOnInit(){
    this.fn_listarEncuesta();
  }


  fn_listarEncuesta() {

    this.ServicesProvider.get(SERVICES.LISTAR_ENCUESTAS, {}).then(response => {

      this.encuestas = response
      console.log(response);

    });


  }




}
