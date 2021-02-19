import { Component, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';
import { SmartTableData } from '../../../@core/data/smart-table';
import { DialogNamePromptComponent } from '../../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component';
import { ShowcaseDialogComponent } from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { NbDialogService } from '@nebular/theme';
@Component({
  selector: 'ngx-accordion',
  templateUrl: 'gestionar-encuestas.component.html',
  styleUrls: ['gestionar-encuestas.component.scss'],
})
export class GestionarEncuestaComponent {
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      nombre_encuesta: {
        title: 'Nombre',
        type: 'string',
      },
      descripcion: {
        title: 'Descripción',
        type: 'string',
      },
      detalle : {
        title: 'Detalles',
        type: 'string',
      },

    },
  };
  names: string[] = [];
  source: LocalDataSource = new LocalDataSource();
  data =[];
  constructor(private service: SmartTableData, private dialogService: NbDialogService) {
    /* const data = this.service.getData(); */
    this.data = [
      {id: "123", nombre_encuesta:"Encuesta de Satisfacción de Clientes", descripcion:"", detalle:""},
      {id: "124", nombre_encuesta:"Encuesta de Motivo de no compra", descripcion:"", detalle:""},

      
    ]
    this.source.load(this.data);
    console.log(this.data)
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Seguro que quiere eliminar esta encuesta')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }


  open3() {
    this.dialogService.open(DialogNamePromptComponent)
      .onClose.subscribe(name  => name && this.data.push( {id: "322", nombre_encuesta:name.nombre, descripcion:name.descripcion, detalle:""}) && this.source.load(this.data) && console.log(name));
      console.log(this.names)
      
  }

  
  open() {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: 'Adicionar Encuesta',
      },
    });
  }


}
