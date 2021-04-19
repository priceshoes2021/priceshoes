import { Component, ViewChild, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';
import { SmartTableData } from '../../../@core/data/smart-table';
import { DialogNamePromptComponent } from '../../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component';
import { ShowcaseDialogComponent } from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { NbDialogService } from '@nebular/theme';
import { SERVICES } from "../../../config/webservices";
import { ServicesProvider } from "../../../config/services";
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import Swal from 'sweetalert2';
@Component({
  selector: 'ngx-accordion',
  templateUrl: 'gestionar-encuestas.component.html',
  styleUrls: ['gestionar-encuestas.component.scss'],
})
export class GestionarEncuestaComponent implements OnInit {
  encuestas = []
  user = "";

  constructor(private service: SmartTableData, private dialogService: NbDialogService, private ServicesProvider: ServicesProvider,private authService: NbAuthService) {

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        console.log(token)
        if (token.isValid()) {
          this.user = token['token']; // here we receive a payload from the token and assigns it to our `user` variable 
        }

      });
      console.log(this.user)
  }
  ngOnInit() {
    this.fn_listarEncuesta()
    console.log(localStorage.key)
    
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
      .onClose.subscribe(name =>  this.fn_agregarEncuesta(name));

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
  fn_agregarEncuesta(encuesta:any){
/*     if (ence) {
      
    } */
    this.oEncuesta=encuesta;
    this.ServicesProvider.post(SERVICES.AGREGAR_ENCUESTAS, this.oEncuesta,  false, this.user).then(response => {
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
        this.ServicesProvider.post(SERVICES.ELIMINAR_ENCUESTA + id, {}, false, this.user).then(response => {
          if (response.status=="Error encuesta asignada") {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'La encuesta no puede ser eliminada por que ha sido asignada a una tienda!',
              confirmButtonColor: '#e62a87',
              timer:1500
            })
          }else{
            console.log(response);
            this.fn_listarEncuesta();
            Swal.fire(
              {  icon: 'success',
              title: 'Encuesta Eliminada con Éxito',
              showConfirmButton: false,
              timer: 1500}
              
            );
          }

        });

      }
    });



  }

}
