import { Component, ViewChild, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';
import { SmartTableData } from '../../../@core/data/smart-table';
import { ModalEncuestaComponent } from '../../modal-overlays/dialog/modal-encuesta/modal-encuesta.component';

import { ShowcaseDialogComponent } from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { NbDialogService } from '@nebular/theme';
import { SERVICES } from "../../../config/webservices";
import { ServicesProvider } from "../../../config/services";
@Component({
  selector: 'informes',
  templateUrl: 'informes-encuestas.component.html',
  styleUrls: ['informes-encuestas.component.scss'],
})
export class InformesEncuestaComponent implements OnInit {


  
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


  abrirFormulario() {
    this.dialogService.open(ModalEncuestaComponent)
      .onClose.subscribe(name => {});

  }





}
