import { Component, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';
import { SmartTableData } from '../../../@core/data/smart-table';
import { DialogNamePromptComponent } from '../../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component';
import { ShowcaseDialogComponent } from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { NbDialogService } from '@nebular/theme';
@Component({
  selector: 'ngx-accordion',
  templateUrl: 'asignar-encuestas.component.html',
  styleUrls: ['asignar-encuestas.component.scss'],
})
export class AsignarEncuestaComponent {
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
      detalle: {
        title: 'Detalles',
        type: 'string',
      },

    },
  };
  names: string[] = [];
  source: LocalDataSource = new LocalDataSource();
  data = [];
  constructor(private service: SmartTableData, private dialogService: NbDialogService) {
    /* const data = this.service.getData(); */
    this.data = [
      { id: "123", nombre_encuesta: "Encuesta de Satisfacción de Clientes", descripcion: "", detalle: "" },
      { id: "124", nombre_encuesta: "Encuesta de Motivo de no compra", descripcion: "", detalle: "" },
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




}
