import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import {
  NbComponentShape,
  NbComponentSize,
  NbComponentStatus,
} from "@nebular/theme";
import { SmartTableData } from "../../../@core/data/smart-table";
import { ModalEncuestaComponent } from "../../modal-overlays/dialog/modal-encuesta/modal-encuesta.component";
import {
  NbSortDirection,
  NbSortRequest,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
} from "@nebular/theme";
import { ShowcaseDialogComponent } from "../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component";
import { NbDialogService } from "@nebular/theme";
import { SERVICES } from "../../../config/webservices";
import { ServicesProvider } from "../../../config/services";
import { NbThemeService, NbColorHelper } from "@nebular/theme";
import Swal from "sweetalert2";
import "lodash";
declare var _: any;
@Component({
  selector: "informes",
  templateUrl: "informes-encuestas.component.html",
  styleUrls: ["informes-encuestas.component.scss"],
})
export class InformesEncuestaComponent implements OnInit, OnDestroy {
  data: any;
  aTiendas: any;
  options: any;
  themeSubscription: any;
  filterPost = "";
  aBarras=[];
  source: LocalDataSource = new LocalDataSource();
  encuestas = [];







  constructor(
    private service: SmartTableData,
    private dialogService: NbDialogService,
    private ServicesProvider: ServicesProvider,
    private theme: NbThemeService
  ) {
    /* const data = this.service.getData(); */

    this.themeSubscription = this.theme.getJsTheme().subscribe((config) => {
      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.data = {
        labels: ["¿Cómo calificarías la tienda"],
        datasets: [
          {
            data: [65],
            label: "Bueno",
            backgroundColor: ["#94FFB7"],
          },
          {
            data: [28],
            label: "Regular",
            backgroundColor: ["#FFF894"],
          },
          {
            data: [85],
            label: "Malo",
            backgroundColor: ["#DA6D79"],
          },
        ],
      };

      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
      };
    });

    console.log(this.encuestas);
  }

  ngOnInit() {
    this.fn_listarEncuestasSolucionadas();
    this.fn_listarTienda();
  }

 


  abrirFormulario() {
    this.dialogService
      .open(ModalEncuestaComponent)
      .onClose.subscribe((name) => {});
  }
  encuestasAsignadas;
  aListaEncuesta = [];
  fn_listarEncuestasSolucionadas() {
    let encuesta = [];
    let body = {
      encuesta: null,
      tienda: null,
      pregunta: null,
      fecha_menor: null,
      fecha_mayor: null,
    };
    this.ServicesProvider.post(
      SERVICES.LISTAR_ENCUESTAS_SOLUCIONADA,
      body
    ).then((response) => {
      encuesta = response.encuestas;
      this.aBarras = response.barras
      console.log(this.aBarras)
      this.fn_arrayFiltroEncuesta(encuesta);
      /*       this.aListaEncuesta.map((encuesta) => [
        { encuesta: encuesta.encuesta, id: encuesta.id },
      ]); */
      this.encuestasAsignadas = _.chain(encuesta)
        .groupBy("encuesta")
        .map((encuesta, datos) => ({ encuesta, datos }))
        .value();

      console.log(response, this.encuestasAsignadas);
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  fn_listarTienda() {
    this.ServicesProvider.get(SERVICES.LISTAR_TIENDAS, {}).then((response) => {
      this.aTiendas = response;
      console.log(response);
    });
  }
  aPregunta;
  fn_arrayFiltroEncuesta(aEncuesta) {
    var encuestas = {};
    var unicos = aEncuesta.filter(function (e) {
      return aEncuesta[e.pk_encuesta]
        ? false
        : (aEncuesta[e.pk_encuesta] = true);
    });
    this.aListaEncuesta = unicos;
    console.log(unicos, this.aListaEncuesta);
  }
}
