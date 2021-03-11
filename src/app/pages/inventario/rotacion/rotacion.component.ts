import { Component, ViewChild, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import {
  NbComponentShape,
  NbComponentSize,
  NbComponentStatus,
} from "@nebular/theme";
import { SmartTableData } from "../../../@core/data/smart-table";
import { ModalEncuestaComponent } from "../../modal-overlays/dialog/modal-encuesta/modal-encuesta.component";

import { ShowcaseDialogComponent } from "../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component";
import { NbDialogService } from "@nebular/theme";
import { SERVICES } from "../../../config/webservices";
import { ServicesProvider } from "../../../config/services";
@Component({
  selector: "rotacion",
  templateUrl: "rotacion.component.html",
  styleUrls: ["rotacion.component.scss"],
})
export class RotacionComponent implements OnInit {
  ngOnInit() {
    this.fn_listarRotaciones();
  }

  settings = {
    actions: false,
    columns: {
      CODIGO: {
        title: "CODIGO",
        type: "number",
        class:"header-color"
      },
      ALM: {
        title: "Almacén",
        type: "string",
      },
      
      COSTO: {
        title: "Costo",
        type: "number",
      },
      PUBLICO: {
        title: "Público",
        type: "string",
      },
      INV: {
        title: "INV",
        type: "string",
      },
      VTA: {
        title: "VTA",
        type: "string",
      },
      ROT: {
        title: "Rotación",
        type: "number",
      },
      CORNER: {
        title: "Corner",
        type: "number",
      },
      ESTADO: {
        title: "Estado",
        type: "string",
      },

    },
    rowClassFunction: (row) =>{
      if(row.data.ROT >= 0 && row.data.ROT <=90){
        return 'azul';
      }else  if(row.data.ROT  > 90 && row.data.ROT <=250) {
        return 'amarillo'
      }
      else  if(row.data.ROT  > 250 ) {
        return 'rojo'
      }
    },
    rowSelect:false,
    selected:false,
    select: false
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData,  private dialogService: NbDialogService, private ServicesProvider: ServicesProvider) {
    /* const data = this.service.getData(); */
    this.source.load(this.data);
  }

  onDeleteConfirm(event): void {
    if (window.confirm("Are you sure you want to delete?")) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }


  fn_listarRotaciones() {

    this.ServicesProvider.get(SERVICES.LISTAR_ROTACIONES, {}).then(response => {


      console.log(response);

    });


  }

  data =[
    {
      "CODIGO": "001CARETAGENERICO",
      "ALM": "37",
      "COSTO": 4800,
      "PUBLICO": 8900,
      "INV": "6",
      "VTA": "1",
      "ROT": 180,
      "CORNER": 0,
      "COLOR_ROT": "#F7FE2E",
      "ESTADO":"Rotación Baja"
    },
    {
      "CODIGO": "001CARETAGENERICO",
      "ALM": "39",
      "COSTO": 4800,
      "PUBLICO": 8900,
      "INV": "11",
      "VTA": "2",
      "ROT": 165,
      "CORNER": 0,
      "COLOR_ROT": "#F7FE2E",
      "ESTADO":"Rotación Baja"
    },
    {
      "CODIGO": "001CARETAGENERICO",
      "ALM": "24",
      "COSTO": 4800,
      "PUBLICO": 8900,
      "INV": "13",
      "VTA": "1",
      "ROT": 390,
      "CORNER": 0,
      "COLOR_ROT": "#B40404",
      "ESTADO":"No Rota"
    },
    {
      "CODIGO": "001CARETAGENERICO",
      "ALM": "7",
      "COSTO": 4800,
      "PUBLICO": 8900,
      "INV": "20",
      "VTA": "0",
      "ROT": 0,
      "CORNER": 0,
      "COLOR_ROT": "#FAFAFA",
      "ESTADO":"Rotación Alta"
    },
    {
      "CODIGO": "001CARETAGENERICO",
      "ALM": "43",
      "COSTO": 4800,
      "PUBLICO": 8900,
      "INV": "133",
      "VTA": "0",
      "ROT": 0,
      "CORNER": 0,
      "COLOR_ROT": "#FAFAFA",
      "ESTADO":"Rotación Alta"
    },
    {
      "CODIGO": "012GEO01NUDE",
      "ALM": "43",
      "COSTO": 35000,
      "PUBLICO": 25900,
      "INV": "1",
      "VTA": "0",
      "ROT": 0,
      "CORNER": 0,
      "COLOR_ROT": "#FAFAFA",
      "ESTADO":"Rotación Alta"
    },
    {
      "CODIGO": "012GEO01NUDE",
      "ALM": "43",
      "COSTO": 35000,
      "PUBLICO": 25900,
      "INV": "1",
      "VTA": "0",
      "ROT": 0,
      "CORNER": 0,
      "COLOR_ROT": "#FAFAFA",
      "ESTADO":"Rotación Alta"
    },
    {
      "CODIGO": "012GEO01NUDE",
      "ALM": "43",
      "COSTO": 35000,
      "PUBLICO": 25900,
      "INV": "1",
      "VTA": "0",
      "ROT": 0,
      "CORNER": 0,
      "COLOR_ROT": "#FAFAFA",
      "ESTADO":"Rotación Alta"
    },
    {
      "CODIGO": "012GEO01NUDE",
      "ALM": "43",
      "COSTO": 35000,
      "PUBLICO": 25900,
      "INV": "1",
      "VTA": "0",
      "ROT": 0,
      "CORNER": 0,
      "COLOR_ROT": "#FAFAFA",
      "ESTADO":"Rotación Alta"
    },
    {
      "CODIGO": "012GEO01NUDE",
      "ALM": "43",
      "COSTO": 35000,
      "PUBLICO": 25900,
      "INV": "1",
      "VTA": "0",
      "ROT": 0,
      "CORNER": 0,
      "COLOR_ROT": "#FAFAFA",
      "ESTADO":"Rotación Alta"
    },
    {
      "CODIGO": "012GEO01NUDE",
      "ALM": "43",
      "COSTO": 35000,
      "PUBLICO": 25900,
      "INV": "1",
      "VTA": "0",
      "ROT": 0,
      "CORNER": 0,
      "COLOR_ROT": "#FAFAFA",
      "ESTADO":"Rotación Alta"
    },
    {
      "CODIGO": "012GEO01NUDE",
      "ALM": "43",
      "COSTO": 35000,
      "PUBLICO": 25900,
      "INV": "1",
      "VTA": "0",
      "ROT": 0,
      "CORNER": 0,
      "COLOR_ROT": "#FAFAFA",
      "ESTADO":"Rotación Alta"
    },
    {
      "CODIGO": "012GEO01NUDE",
      "ALM": "43",
      "COSTO": 35000,
      "PUBLICO": 25900,
      "INV": "1",
      "VTA": "0",
      "ROT": 0,
      "CORNER": 0,
      "COLOR_ROT": "#FAFAFA",
      "ESTADO":"Rotación Baja"
    },
    {
      "CODIGO": "012GEO01NUDE",
      "ALM": "43",
      "COSTO": 35000,
      "PUBLICO": 25900,
      "INV": "1",
      "VTA": "0",
      "ROT": 0,
      "CORNER": 0,
      "COLOR_ROT": "#FAFAFA",
      "ESTADO":"Rotación Alta"
    },
    {
      "CODIGO": "012GEO01NUDE",
      "ALM": "43",
      "COSTO": 35000,
      "PUBLICO": 25900,
      "INV": "1",
      "VTA": "0",
      "ROT": 0,
      "CORNER": 0,
      "COLOR_ROT": "#FAFAFA",
      "ESTADO":"Rotación Alta"
    },
    {
      "CODIGO": "012GEO01NUDE",
      "ALM": "43",
      "COSTO": 35000,
      "PUBLICO": 25900,
      "INV": "1",
      "VTA": "0",
      "ROT": 0,
      "CORNER": 0,
      "COLOR_ROT": "#FAFAFA",
      "ESTADO":"Rotación Alta"
    },
    {
      "CODIGO": "012GEO01NUDE",
      "ALM": "43",
      "COSTO": 35000,
      "PUBLICO": 25900,
      "INV": "1",
      "VTA": "0",
      "ROT": 0,
      "CORNER": 0,
      "COLOR_ROT": "#FAFAFA",
      "ESTADO":"Rotación Baja"
    },
    {
      "CODIGO": "012GEO01NUDE",
      "ALM": "43",
      "COSTO": 35000,
      "PUBLICO": 25900,
      "INV": "1",
      "VTA": "0",
      "ROT": 0,
      "CORNER": 0,
      "COLOR_ROT": "#FAFAFA",
      "ESTADO":"Rotación Baja"
    },
    {
      "CODIGO": "012GEO01NUDE",
      "ALM": "43",
      "COSTO": 35000,
      "PUBLICO": 25900,
      "INV": "1",
      "VTA": "0",
      "ROT": 0,
      "CORNER": 0,
      "COLOR_ROT": "#FAFAFA",
      "ESTADO":"Rotación Alta"
    },
    {
      "CODIGO": "122B01BEIGE",
      "ALM": "6",
      "COSTO": 31625,
      "PUBLICO": 39900,
      "INV": "0",
      "VTA": "1",
      "ROT": 0,
      "CORNER": 0,
      "COLOR_ROT": "#FAFAFA",
      "ESTADO":"Rotación Alta"
    },
    {
      "CODIGO": "122B01DORADO",
      "ALM": "40",
      "COSTO": 31625,
      "PUBLICO": 39900,
      "INV": "1",
      "VTA": "-1",
      "ROT": -1,
      "CORNER": 0,
      "COLOR_ROT": "#FAFAFA",
      "ESTADO":"Devolución"
    },
    {
      "CODIGO": "122B01BLANCO",
      "ALM": "1",
      "COSTO": 31625,
      "PUBLICO": 39900,
      "INV": "1",
      "VTA": "1",
      "ROT": 30,
      "CORNER": 0,
      "COLOR_ROT": "#5882FA",
      "ESTADO":"Rotación Alta"
    },
    {
      "CODIGO": "122B01BLANCO",
      "ALM": "6",
      "COSTO": 31625,
      "PUBLICO": 39900,
      "INV": "1",
      "VTA": "0",
      "ROT": 0,
      "CORNER": 0,
      "COLOR_ROT": "#FAFAFA",
      "ESTADO":"Rotación Alta"
    },
    {
      "CODIGO": "122B01DORADO",
      "ALM": "45",
      "COSTO": 31625,
      "PUBLICO": 39900,
      "INV": "3",
      "VTA": "0",
      "ROT": 0,
      "CORNER": 0,
      "COLOR_ROT": "#FAFAFA",
      "ESTADO":"Rotación Alta"
    },
    {
      "CODIGO": "122B01BEIGE",
      "ALM": "6",
      "COSTO": 31625,
      "PUBLICO": 39900,
      "INV": "0",
      "VTA": "1",
      "ROT": 0,
      "CORNER": 0,
      "COLOR_ROT": "#FAFAFA",
      "ESTADO":"Rotación Alta"
    },
    {
      "CODIGO": "122B01DORADO",
      "ALM": "40",
      "COSTO": 31625,
      "PUBLICO": 39900,
      "INV": "1",
      "VTA": "-1",
      "ROT": -1,
      "CORNER": 0,
      "COLOR_ROT": "#FAFAFA",
      "ESTADO":"Devolución"
    },
    {
      "CODIGO": "122B01BLANCO",
      "ALM": "1",
      "COSTO": 31625,
      "PUBLICO": 39900,
      "INV": "1",
      "VTA": "1",
      "ROT": 30,
      "CORNER": 0,
      "COLOR_ROT": "#5882FA",
      "ESTADO":"Rotación Alta"
    },
    {
      "CODIGO": "122B01BLANCO",
      "ALM": "6",
      "COSTO": 31625,
      "PUBLICO": 39900,
      "INV": "1",
      "VTA": "0",
      "ROT": 0,
      "CORNER": 0,
      "COLOR_ROT": "#FAFAFA",
      "ESTADO":"Rotación Alta"
    },
    {
      "CODIGO": "122B01DORADO",
      "ALM": "45",
      "COSTO": 31625,
      "PUBLICO": 39900,
      "INV": "3",
      "VTA": "0",
      "ROT": 0,
      "CORNER": 0,
      "COLOR_ROT": "#FAFAFA",
      "ESTADO":"Rotación Alta"
    },
    {
      "CODIGO": "122B01BEIGE",
      "ALM": "6",
      "COSTO": 31625,
      "PUBLICO": 39900,
      "INV": "0",
      "VTA": "1",
      "ROT": 0,
      "CORNER": 0,
      "COLOR_ROT": "#FAFAFA",
      "ESTADO":"Rotación Alta"
    },
    {
      "CODIGO": "122B01DORADO",
      "ALM": "40",
      "COSTO": 31625,
      "PUBLICO": 39900,
      "INV": "1",
      "VTA": "-1",
      "ROT": -1,
      "CORNER": 0,
      "COLOR_ROT": "#FAFAFA",
      "ESTADO":"Devolución"
    },
    {
      "CODIGO": "122B01BLANCO",
      "ALM": "1",
      "COSTO": 31625,
      "PUBLICO": 39900,
      "INV": "1",
      "VTA": "1",
      "ROT": 30,
      "CORNER": 0,
      "COLOR_ROT": "#5882FA",
      "ESTADO":"Rotación Alta"
    },
    {
      "CODIGO": "122B01BLANCO",
      "ALM": "6",
      "COSTO": 31625,
      "PUBLICO": 39900,
      "INV": "1",
      "VTA": "0",
      "ROT": 0,
      "CORNER": 0,
      "COLOR_ROT": "#FAFAFA",
      "ESTADO":"Rotación Alta"
    },
    {
      "CODIGO": "122B01DORADO",
      "ALM": "45",
      "COSTO": 31625,
      "PUBLICO": 39900,
      "INV": "3",
      "VTA": "0",
      "ROT": 0,
      "CORNER": 0,
      "COLOR_ROT": "#FAFAFA",
      "ESTADO":"Rotación Alta"
    },
    {
      "CODIGO": "122B01BEIGE",
      "ALM": "6",
      "COSTO": 31625,
      "PUBLICO": 39900,
      "INV": "0",
      "VTA": "1",
      "ROT": 0,
      "CORNER": 0,
      "COLOR_ROT": "#FAFAFA",
      "ESTADO":"Rotación Alta"
    },
    {
      "CODIGO": "122B01DORADO",
      "ALM": "40",
      "COSTO": 31625,
      "PUBLICO": 39900,
      "INV": "1",
      "VTA": "-1",
      "ROT": -1,
      "CORNER": 0,
      "COLOR_ROT": "#FAFAFA",
      "ESTADO":"Devolución"
    },
    {
      "CODIGO": "122B01BLANCO",
      "ALM": "1",
      "COSTO": 31625,
      "PUBLICO": 39900,
      "INV": "1",
      "VTA": "1",
      "ROT": 30,
      "CORNER": 0,
      "COLOR_ROT": "#5882FA",
      "ESTADO":"Rotación Alta"
    }
  ]

}
