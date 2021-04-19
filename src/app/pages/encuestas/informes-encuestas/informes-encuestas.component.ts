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
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
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
  aBarras = [];
  source: LocalDataSource = new LocalDataSource();
  encuestas = [];
  encuestasAsignadas;
  aEncuestas = [];
  aPreguntas = [];
  KPI=0;
  body = {
    encuesta: null,
    tienda: null,
    pregunta: null,
    fecha_menor: null,
    fecha_mayor: null,
  };
  user=""
  constructor(
    private service: SmartTableData,
    private dialogService: NbDialogService,
    private ServicesProvider: ServicesProvider,
    private theme: NbThemeService,
    private authService: NbAuthService) {

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
    this.fn_listarEncuestasSolucionadas('inicio');
    this.fn_listarTienda();
  }

  fn_graficarBarras(){

    this.themeSubscription = this.theme.getJsTheme().subscribe((config) => {
      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.data = this.aBarras; /*  {
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
      }; */

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
  }

  fn_listarEncuestasSolucionadas(filtro, valor?) {
    console.log(filtro, valor)
    let encuesta = [];
      switch (filtro) {
      case "tienda":
        this.body.tienda = valor;
        break;
      case "encuesta":
        this.body.encuesta = valor;
        break;
      case "pregunta":
        this.body.pregunta = valor;
        break;
      case "inicio":

        break;
      case "":
        break;

      default:
        break;
    }
    this.ServicesProvider.post(
      SERVICES.LISTAR_ENCUESTAS_SOLUCIONADA,
      this.body,  false, this.user 
    ).then((response) => {
      
      encuesta = response.encuestas;
      this.aBarras = response.barras;
      console.log(this.aBarras);
      this.aEncuestas = response.encuestas_filtro;
      this.aPreguntas = response.preguntas;
      this.KPI=response.kpi
      this.encuestasAsignadas = _.chain(encuesta)
        .groupBy("encuesta")
        .map((encuesta, datos) => ({ encuesta, datos, cantidad:12 }))
        .value();
        this.fn_graficarBarras();
        
        this.encuestasAsignadas[0].cantidad=15
        this.encuestasAsignadas[1].cantidad=14
        this.encuestasAsignadas[2].cantidad=8
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

/*   fn_arrayFiltroEncuesta(aEncuesta) {
    var encuestas = {};
    var unicos = aEncuesta.filter(function (e) {
      return aEncuesta[e.pk_encuesta]
        ? false
        : (aEncuesta[e.pk_encuesta] = true);
    });
    this.aListaEncuesta = unicos;
    console.log(unicos, this.aListaEncuesta);
  } */
}
