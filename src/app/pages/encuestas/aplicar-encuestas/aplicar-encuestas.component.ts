import { Component, ViewChild, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import {
  NbComponentShape,
  NbComponentSize,
  NbComponentStatus,
} from "@nebular/theme";
import { SmartTableData } from "../../../@core/data/smart-table";
import { DialogNamePromptComponent } from "../../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component";
import { ShowcaseDialogComponent } from "../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component";
import { NbDialogService } from "@nebular/theme";
import { SERVICES } from "../../../config/webservices";
import { ServicesProvider } from "../../../config/services";
import Swal from "sweetalert2";
import "lodash";
declare var _: any;
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
@Component({
  selector: "ngx-accordion",
  templateUrl: "aplicar-encuestas.component.html",
  styleUrls: ["aplicar-encuestas.component.scss"],
})
export class AplicarEncuestaComponent implements OnInit {
  //Variables
  mostrar_encuesta: any;
  encuestasAsignadas;
  id_tienda
  id_encuesta
  aPregunta = [];
  bMostarTabla=true;
  user=""
  constructor(
    private service: SmartTableData,
    private dialogService: NbDialogService,
    private ServicesProvider: ServicesProvider,
    private authService: NbAuthService) {


      this.user = localStorage.getItem("token")

        console.log(this.user)
    }

  ngOnInit() {
    this.fn_listarEncuestasAsignadas();
  }

  fn_listarEncuestasAsignadas() {
    this.ServicesProvider.get(SERVICES.LISTAR_ENCUESTAS_ASIGNADAS, {}).then(
      (response) => {
        this.encuestasAsignadas = response;
        console.log(response);
      }
    );
  }

  fn_MostrartEncuesta(id, tienda, id_aplicacionEncuesta) {
    this.id_tienda = tienda
    this.id_encuesta =id_aplicacionEncuesta
    this.mostrar_encuesta = [];
    this.ServicesProvider.get(SERVICES.MOSTRAR_ENCUESTA + id, {}).then(
      (response) => {
        
       var nuevoArray = [];
       response.forEach(element => {
        nuevoArray.push({
          nombre_encuesta: element.nombre,
          pregunta: element.pregunta,
          nombre_respuesta: element.nombre_respuesta,
          imagen:element.image
        })
       });

        

        this.mostrar_encuesta = nuevoArray;
        console.log(nuevoArray);
        this.bMostarTabla=false;
      }
    );
  }
  aRespuestas=[]
  aListaRespuesta=[]
  fn_preguntaRespuesta(pregunta, respuesta, posicion) {
    this.aRespuestas[posicion] = {
      pregunta:pregunta,
      respuesta:respuesta
    }
    console.log(this.aRespuestas)
/*     console.log(this.aListaRespuesta)
    console.log(pregunta, respuesta);
    let preguntaRepetida=false
    this.aPregunta = [];
    if (this.aPregunta.length != 0) {
      for (let index = 0; index < this.aPregunta.length; index++) {
        if (this.aPregunta[index].pregunta == pregunta) {
          this.aPregunta[index].respuesta = respuesta;
          preguntaRepetida = true;
        }
      }
      if (!preguntaRepetida) {
        this.aPregunta.push({
          pregunta: pregunta,
          respuesta: respuesta,
        });

      }

    } else {
      console.log("entré aca");
      this.aPregunta.push({
        pregunta: pregunta,
        respuesta: respuesta,
      });
     this.aRespuestas.forEach(element => {

     });
    }
    this.aRespuestas.push(this.aPregunta[0])
    console.log(this.aPregunta, this.aRespuestas); */
  }

  fn_llenarEncuesta(id_encuesta) {
    console.log(id_encuesta);

    let encuesta_responder = {
      pk_aplicacionEncuesta: this.id_encuesta,
      pk_tienda: this.id_tienda,
      solucion: this.aRespuestas,
    };
    console.log(encuesta_responder);
         this.ServicesProvider.post(SERVICES.LLENAR_ENCUESTA, encuesta_responder, false, this.user).then((response) => {
      console.log(response);
          this.aRespuestas = [];
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Encuesta Guardada con éxito",
        showConfirmButton: false,
        timer: 1500,
      });
      this.bMostarTabla=true;
    }); 
  }
}
