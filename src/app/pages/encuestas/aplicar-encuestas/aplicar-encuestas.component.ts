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
  constructor(
    private service: SmartTableData,
    private dialogService: NbDialogService,
    private ServicesProvider: ServicesProvider
  ) {}

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
        var arrayTemporal = [];
        for (var i = 0; i < response.length; i++) {
          arrayTemporal = nuevoArray.filter(
            (resp) => resp["pregunta"] == response[i]["pregunta"]
          );
          if (arrayTemporal.length > 0) {
            nuevoArray[nuevoArray.indexOf(arrayTemporal[0])][
              "nombre_respuesta"
            ].push(response[i]["nombre_respuesta"]);
          } else {
            nuevoArray.push({
              nombre_encuesta: response[i].nombre,
              pregunta: response[i]["pregunta"],
              nombre_respuesta: [response[i]["nombre_respuesta"]],
            });
          }
        }

        this.mostrar_encuesta = nuevoArray;
        console.log(nuevoArray);
        this.bMostarTabla=false;
      }
    );
  }
  aRespuestas=[]
  fn_preguntaRespuesta(pregunta, respuesta) {
    
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
    }
    this.aRespuestas.push(this.aPregunta[0])
    console.log(this.aPregunta, this.aRespuestas);
  }

  fn_llenarEncuesta(id_encuesta) {
    console.log(id_encuesta);

    let encuesta_responder = {
      pk_aplicacionEncuesta: this.id_encuesta,
      pk_tienda: this.id_tienda,
      solucion: this.aRespuestas,
    };
    console.log(encuesta_responder);
         this.ServicesProvider.post(SERVICES.LLENAR_ENCUESTA, encuesta_responder).then((response) => {
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
