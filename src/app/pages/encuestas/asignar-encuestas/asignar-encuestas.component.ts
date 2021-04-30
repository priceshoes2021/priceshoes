import { Component, ViewChild, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';
import { SmartTableData } from '../../../@core/data/smart-table';
import { ModalEncuestaComponent } from '../../modal-overlays/dialog/modal-encuesta/modal-encuesta.component';
import Swal from 'sweetalert2';
import { ShowcaseDialogComponent } from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { NbDialogService } from '@nebular/theme';
import { SERVICES } from "../../../config/webservices";
import { ServicesProvider } from "../../../config/services";
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
@Component({
  selector: 'ngx-accordion',
  templateUrl: 'asignar-encuestas.component.html',
  styleUrls: ['asignar-encuestas.component.scss'],
})
export class AsignarEncuestaComponent implements OnInit {


  user=""
  names: string[] = [];
  source: LocalDataSource = new LocalDataSource();
  data = [];
  encuestas =[]
  constructor(private service: SmartTableData, private dialogService: NbDialogService, private ServicesProvider: ServicesProvider,private authService: NbAuthService) {

    this.user = localStorage.getItem("token")
      console.log(this.user)
  }
  ngOnInit(){
    this.fn_listarEncuesta();
    this.fn_listarEncuestasAsignadas();
  }


  fn_listarEncuesta() {

    this.ServicesProvider.get(SERVICES.LISTAR_ENCUESTAS, {}).then(response => {

      this.encuestas = response
      console.log(response);

    });


  }


  abrirFormulario(id_formulario) {
    this.dialogService.open(ModalEncuestaComponent)
      .onClose.subscribe(name =>  this.fn_asignarEncuesta(name.id_tienda, id_formulario, name.fechaApertura, name.fechaCierre));

  }

  fn_asignarEncuesta( pk_tienda :string,  pk_tipoEncuesta:number, fechaApertura:string, fechaCierre:string){

    let encuesta_asignada = {
      pk_tienda:parseInt(pk_tienda, 10),
      pk_tipoEncuesta: pk_tipoEncuesta,
      fechaApertura: fechaApertura,
      fechaCierre: fechaCierre
}
    this.ServicesProvider.post(SERVICES.ASIGNAR_ENCUESTA , encuesta_asignada, false, this.user ).then(response => {
      if (response.status = "encuesta asignada") {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response.status,
          showConfirmButton: true,
          timer:2000
        
        })
        this.fn_listarEncuestasAsignadas();

      } else {
        
      }
      console.log(response);
      /* this.fn_listarEncuesta(); */

    });
  }

encuestasAsignadas
  fn_listarEncuestasAsignadas(){
    

    this.ServicesProvider.get(SERVICES.LISTAR_ENCUESTAS_ASIGNADAS, {}).then(response => {

      this.encuestasAsignadas = response
      console.log(response);

    });

  }


  fn_eliminarEncuesta_Asignada(id, id_tienda) {
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
  
        let pk_aplicacionEncuesta = {
          pk_tienda: id_tienda
        };
        this.ServicesProvider.post(SERVICES.ELIMINAR_ENCUESTA_ASIGNADA + id, pk_aplicacionEncuesta, false, this.user).then(response => {
          console.log(response);
          this.fn_listarEncuesta();
          this.fn_listarEncuestasAsignadas();
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
