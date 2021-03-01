import { Component, ViewChild, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';
import { SmartTableData } from '../../../@core/data/smart-table';
import { DialogNamePromptComponent } from '../../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component';
import { ShowcaseDialogComponent } from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { NbDialogService } from '@nebular/theme';
import { SERVICES } from "../../../config/webservices";
import { ServicesProvider } from "../../../config/services";

import Swal from 'sweetalert2';
@Component({
  selector: 'ngx-accordion',
  templateUrl: 'gestionar-encuestas.component.html',
  styleUrls: ['gestionar-encuestas.component.scss'],
})
export class GestionarEncuestaComponent implements OnInit {
  encuestas = []


  constructor(private service: SmartTableData, private dialogService: NbDialogService, private ServicesProvider: ServicesProvider,) {
    /* const data = this.service.getData(); */
/*     this.encuestas = [
      { id: "123", nombre_encuesta: "Encuesta de Satisfacción de Clientes", fecha_encuesta: "19/02/2021" },
      { id: "124", nombre_encuesta: "Encuesta de Motivo de no compra", fecha_encuesta: "21/02/2021", },


    ] */

  }
  ngOnInit() {
    this.fn_listarEncuesta()
  }

  onDeleteConfirm(event): void {
    console.log(event)
    if (window.confirm('Seguro que quiere eliminar esta encuesta')) {
      this.removeItemFromArr(this.encuestas, event)
      console.log(this.encuestas)
    } else {
      event.confirm.reject();
    }
  }


  abrirFormulario() {
    this.dialogService.open(DialogNamePromptComponent)
      .onClose.subscribe(name =>  this.fn_agregarEncuesta());

  }


  open() {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: 'Adicionar Encuesta',
      },
    });
  }

  removeItemFromArr(arr, item) {
    console.log(arr, item)


    arr.splice(item, 1);

  }

  fn_listarEncuesta() {

    this.ServicesProvider.get(SERVICES.LISTAR_ENCUESTAS, {}).then(response => {

      this.encuestas = response
      console.log(response);

    });


  }
  oEncuesta:{}
  fn_agregarEncuesta(){
    this.oEncuesta={
      "nombre":"Encuesta de otra prueba",
      "descripcion":"",
      "preguntas":[
         {
            "nombre":"Como describiría la atencion?",
            "respuestas":[
               "Buena",
               "Regular",
               "Mala"
            ]
         },
         {
            "nombre":"Como describiría la tienda?",
            "respuestas":[
               "Buena",
               "Regular",
               "Mala"
            ]
         }
      ] 
    }
    this.ServicesProvider.post(SERVICES.AGREGAR_ENCUESTAS, this.oEncuesta).then(response => {
      console.log(response)
      this.fn_listarEncuesta()
      this.ServicesProvider.fn_generarAlerta("exito", "Guardado con éxito")
    })
  }


  
  fn_eliminarModelo(id) {
    console.log(id)
    Swal.fire({
      title: '¿Seguro que quieres eliminar esta encuesta?',
      text: "Si la eliminas no podrás recuperarla",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e62a87',
      showLoaderOnConfirm: true,
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.ServicesProvider.preloaderOn();
        console.log(id);

        let pk_tipoEncuesta = {
          pk_tipoEncuesta: id
        };
        this.ServicesProvider.post(SERVICES.ELIMINAR_ENCUESTA + id).then(response => {
          console.log(response);
          this.fn_listarEncuesta();
          Swal.fire(
            {  icon: 'success',
            title: 'Encuesta Eliminada con Éxito',
            showConfirmButton: false,
            timer: 1500}
            
          );
          this.ServicesProvider.preloaderOff();
        });

      }
    });



  }

}
