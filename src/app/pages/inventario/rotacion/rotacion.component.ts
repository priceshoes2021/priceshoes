import { Component, ViewChild, Input, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import {
  NbSortDirection,
  NbSortRequest,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
} from "@nebular/theme";
import { SmartTableData } from "../../../@core/data/smart-table";
import { NbDialogService } from "@nebular/theme";
import { SERVICES } from "../../../config/webservices";
import { ServicesProvider } from "../../../config/services";

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  CODIGO: string;
  ALM: string;
  COSTO: number;
  PUBLICO: number;
  INV: string;
  VTA: string;
  ROT: number;
  CORNER: number;
  COLOR_ROT: string;
  ESTADO: string;
  ICON: number;
  LINEA: string,
  CATEGORIA: string,
  SUBCATEGORIA: string,
  SEGMENTO: string,
  TALLA: string,
  COLOR: string,
}
@Component({
  selector: "rotacion",
  templateUrl: "rotacion.component.html",
  styleUrls: ["rotacion.component.scss"],
})
export class RotacionComponent implements OnInit {
  aCorner = [];
  aDatos=[];
  filterPost = "";
  customColumn = "CODIGO";
  defaultColumns = [
    "ALM",
    "COSTO",
    "PUBLICO",
    "INV",
    "VTA",
    "ROT",
    "CORNER",
    "LINEA",
    "CATEGORIA",
    "SUBCATEGORIA",
    "SEGMENTO",
    "TALLA",
    "COLOR",

  ];
  allColumns = [this.customColumn, ...this.defaultColumns];
  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  private data: TreeNode<FSEntry>[] = [];/* [
    {
      data: {
        CODIGO: "Total 001CARETAGENERICO",
        ALM: "",
        COSTO: 4800,
        PUBLICO: 4800,
        INV: "184",
        VTA: "5",
        ROT: 1141,
        CORNER: 0,
        COLOR_ROT: "#F7FE2E",
        ESTADO: "Rotación Baja",
        ICON: 1,
      },
      children: [
        {
          data: {
            CODIGO: "001CARETAGENERICO",
            ALM: "39",
            COSTO: 4800,
            PUBLICO: 8900,
            INV: "11",
            VTA: "2",
            ROT: 165,
            CORNER: 0,
            COLOR_ROT: "#F7FE2E",
            ESTADO: "Rotación Baja",
            ICON: 9,
          },
        },
        {
          data: {
            CODIGO: "001CARETAGENERICO",
            ALM: "24",
            COSTO: 4800,
            PUBLICO: 8900,
            INV: "13",
            VTA: "1",
            ROT: 390,
            CORNER: 0,
            COLOR_ROT: "#B40404",
            ESTADO: "No Rota",
            ICON: 8,
          },
        },
        {
          data: {
            CODIGO: "001CARETAGENERICO",
            ALM: "7",
            COSTO: 4800,
            PUBLICO: 8900,
            INV: "20",
            VTA: "0",
            ROT: 0,
            CORNER: 0,
            COLOR_ROT: "#FAFAFA",
            ESTADO: "Rotación Alta",
            ICON: 8,
          },
        },
        {
          data: {
            CODIGO: "001CARETAGENERICO",
            ALM: "43",
            COSTO: 4800,
            PUBLICO: 8900,
            INV: "133",
            VTA: "0",
            ROT: 0,
            CORNER: 0,
            COLOR_ROT: "#FAFAFA",
            ESTADO: "Rotación Alta",
            ICON: 8,
          },
        },
      ],
    },
    {
      data: {
        CODIGO: "Total 022B8359109OROROSA",
        ALM: "43",
        COSTO: 35000,
        PUBLICO: 25900,
        INV: "1",
        VTA: "0",
        ROT: 0,
        CORNER: 0,
        COLOR_ROT: "#FAFAFA",
        ESTADO: "Rotación Alta",
        ICON: 1,
      },
      children: [
        {
          data: {
            CODIGO: "012GEO01NUDE",
            ALM: "43",
            COSTO: 35000,
            PUBLICO: 25900,
            INV: "1",
            VTA: "0",
            ROT: 0,
            CORNER: 0,
            COLOR_ROT: "#FAFAFA",
            ESTADO: "Rotación Alta",
            ICON: 4,
          },
        },
        {
          data: {
            CODIGO: "012GEO01NUDE",
            ALM: "43",
            COSTO: 35000,
            PUBLICO: 25900,
            INV: "1",
            VTA: "0",
            ROT: 0,
            CORNER: 0,
            COLOR_ROT: "#FAFAFA",
            ESTADO: "Rotación Alta",
            ICON: 6,
          },
        },
      ],
    },
    {
      data: {
        CODIGO: "012GEO01NUDE",
        ALM: "43",
        COSTO: 35000,
        PUBLICO: 25900,
        INV: "1",
        VTA: "0",
        ROT: 0,
        CORNER: 0,
        COLOR_ROT: "#FAFAFA",
        ESTADO: "Rotación Alta",
        ICON: 1,
      },
      children: [
        {
          data: {
            CODIGO: "012GEO01NUDE",
            ALM: "43",
            COSTO: 35000,
            PUBLICO: 25900,
            INV: "1",
            VTA: "0",
            ROT: 0,
            CORNER: 0,
            COLOR_ROT: "#FAFAFA",
            ESTADO: "Rotación Alta",
            ICON: 3,
          },
        },
        {
          data: {
            CODIGO: "012GEO01NUDE",
            ALM: "43",
            COSTO: 35000,
            PUBLICO: 25900,
            INV: "1",
            VTA: "0",
            ROT: 0,
            CORNER: 0,
            COLOR_ROT: "#FAFAFA",
            ESTADO: "Rotación Alta",
            ICON: 3,
          },
        },
      ],
    },
  ]; */

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + nextColumnStep * index;
  }

  settings = {
    actions: false,
    columns: {
      CODIGO: {
        title: "CODIGO",
        type: "number",
        class: "header-color",
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
    rowClassFunction: (row) => {
      if (row.data.ROT >= 0 && row.data.ROT <= 90) {
        return "azul";
      } else if (row.data.ROT > 90 && row.data.ROT <= 250) {
        return "amarillo";
      } else if (row.data.ROT > 250) {
        return "rojo";
      }
    },
    rowSelect: false,
    selected: false,
    select: false,
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private service: SmartTableData,
    private dialogService: NbDialogService,
    private ServicesProvider: ServicesProvider,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>
  ) {
    this.fn_listarInventario();
    
    this.source.load(this.datas);
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  ngOnInit() {
    this.fn_listarRotaciones();
    this.fn_listarCorner();
 

   /*  this.data = this.aDatos; */
  }

  fn_listarRotaciones() {
    this.ServicesProvider.get(SERVICES.LISTAR_ROTACIONES, {}).then(
      (response) => {
        console.log(response);
      }
    );
  }

  fn_listarCorner() {
    this.ServicesProvider.get(SERVICES.LISTAR_CORNERS, {}).then((response) => {
      this.aCorner = response;
      console.log(response);
    });
  }
  bTable=false;
  fn_listarInventario() {
    this.ServicesProvider.getjson("../../../assets/data/Rotacion-1616051219095.json", {}).then((response) => {
      this.data = response;
      this.dataSource = this.dataSourceBuilder.create(this.data);
      if(this.aDatos != []){
        this.bTable = true;
      }
      console.log(response);
    });
  }

  datas = [
    {
      CODIGO: "001CARETAGENERICO",
      ALM: "37",
      COSTO: 4800,
      PUBLICO: 8900,
      INV: "6",
      VTA: "1",
      ROT: 180,
      CORNER: 0,
      COLOR_ROT: "#F7FE2E",
      ESTADO: "Rotación Baja",
    },
    {
      CODIGO: "001CARETAGENERICO",
      ALM: "39",
      COSTO: 4800,
      PUBLICO: 8900,
      INV: "11",
      VTA: "2",
      ROT: 165,
      CORNER: 0,
      COLOR_ROT: "#F7FE2E",
      ESTADO: "Rotación Baja",
    },
    {
      CODIGO: "001CARETAGENERICO",
      ALM: "24",
      COSTO: 4800,
      PUBLICO: 8900,
      INV: "13",
      VTA: "1",
      ROT: 390,
      CORNER: 0,
      COLOR_ROT: "#B40404",
      ESTADO: "No Rota",
    },
    {
      CODIGO: "001CARETAGENERICO",
      ALM: "7",
      COSTO: 4800,
      PUBLICO: 8900,
      INV: "20",
      VTA: "0",
      ROT: 0,
      CORNER: 0,
      COLOR_ROT: "#FAFAFA",
      ESTADO: "Rotación Alta",
    },
    {
      CODIGO: "001CARETAGENERICO",
      ALM: "43",
      COSTO: 4800,
      PUBLICO: 8900,
      INV: "133",
      VTA: "0",
      ROT: 0,
      CORNER: 0,
      COLOR_ROT: "#FAFAFA",
      ESTADO: "Rotación Alta",
    },
    {
      CODIGO: "012GEO01NUDE",
      ALM: "43",
      COSTO: 35000,
      PUBLICO: 25900,
      INV: "1",
      VTA: "0",
      ROT: 0,
      CORNER: 0,
      COLOR_ROT: "#FAFAFA",
      ESTADO: "Rotación Alta",
    },
    {
      CODIGO: "012GEO01NUDE",
      ALM: "43",
      COSTO: 35000,
      PUBLICO: 25900,
      INV: "1",
      VTA: "0",
      ROT: 0,
      CORNER: 0,
      COLOR_ROT: "#FAFAFA",
      ESTADO: "Rotación Alta",
    },
    {
      CODIGO: "012GEO01NUDE",
      ALM: "43",
      COSTO: 35000,
      PUBLICO: 25900,
      INV: "1",
      VTA: "0",
      ROT: 0,
      CORNER: 0,
      COLOR_ROT: "#FAFAFA",
      ESTADO: "Rotación Alta",
    },
    {
      CODIGO: "012GEO01NUDE",
      ALM: "43",
      COSTO: 35000,
      PUBLICO: 25900,
      INV: "1",
      VTA: "0",
      ROT: 0,
      CORNER: 0,
      COLOR_ROT: "#FAFAFA",
      ESTADO: "Rotación Alta",
    },
    {
      CODIGO: "012GEO01NUDE",
      ALM: "43",
      COSTO: 35000,
      PUBLICO: 25900,
      INV: "1",
      VTA: "0",
      ROT: 0,
      CORNER: 0,
      COLOR_ROT: "#FAFAFA",
      ESTADO: "Rotación Alta",
    },
    {
      CODIGO: "012GEO01NUDE",
      ALM: "43",
      COSTO: 35000,
      PUBLICO: 25900,
      INV: "1",
      VTA: "0",
      ROT: 0,
      CORNER: 0,
      COLOR_ROT: "#FAFAFA",
      ESTADO: "Rotación Alta",
    },
    {
      CODIGO: "012GEO01NUDE",
      ALM: "43",
      COSTO: 35000,
      PUBLICO: 25900,
      INV: "1",
      VTA: "0",
      ROT: 0,
      CORNER: 0,
      COLOR_ROT: "#FAFAFA",
      ESTADO: "Rotación Alta",
    },
    {
      CODIGO: "012GEO01NUDE",
      ALM: "43",
      COSTO: 35000,
      PUBLICO: 25900,
      INV: "1",
      VTA: "0",
      ROT: 0,
      CORNER: 0,
      COLOR_ROT: "#FAFAFA",
      ESTADO: "Rotación Baja",
    },
    {
      CODIGO: "012GEO01NUDE",
      ALM: "43",
      COSTO: 35000,
      PUBLICO: 25900,
      INV: "1",
      VTA: "0",
      ROT: 0,
      CORNER: 0,
      COLOR_ROT: "#FAFAFA",
      ESTADO: "Rotación Alta",
    },
    {
      CODIGO: "012GEO01NUDE",
      ALM: "43",
      COSTO: 35000,
      PUBLICO: 25900,
      INV: "1",
      VTA: "0",
      ROT: 0,
      CORNER: 0,
      COLOR_ROT: "#FAFAFA",
      ESTADO: "Rotación Alta",
    },
    {
      CODIGO: "012GEO01NUDE",
      ALM: "43",
      COSTO: 35000,
      PUBLICO: 25900,
      INV: "1",
      VTA: "0",
      ROT: 0,
      CORNER: 0,
      COLOR_ROT: "#FAFAFA",
      ESTADO: "Rotación Alta",
    },
    {
      CODIGO: "012GEO01NUDE",
      ALM: "43",
      COSTO: 35000,
      PUBLICO: 25900,
      INV: "1",
      VTA: "0",
      ROT: 0,
      CORNER: 0,
      COLOR_ROT: "#FAFAFA",
      ESTADO: "Rotación Baja",
    },
    {
      CODIGO: "012GEO01NUDE",
      ALM: "43",
      COSTO: 35000,
      PUBLICO: 25900,
      INV: "1",
      VTA: "0",
      ROT: 0,
      CORNER: 0,
      COLOR_ROT: "#FAFAFA",
      ESTADO: "Rotación Baja",
    },
    {
      CODIGO: "012GEO01NUDE",
      ALM: "43",
      COSTO: 35000,
      PUBLICO: 25900,
      INV: "1",
      VTA: "0",
      ROT: 0,
      CORNER: 0,
      COLOR_ROT: "#FAFAFA",
      ESTADO: "Rotación Alta",
    },
    {
      CODIGO: "122B01BEIGE",
      ALM: "6",
      COSTO: 31625,
      PUBLICO: 39900,
      INV: "0",
      VTA: "1",
      ROT: 0,
      CORNER: 0,
      COLOR_ROT: "#FAFAFA",
      ESTADO: "Rotación Alta",
    },
    {
      CODIGO: "122B01DORADO",
      ALM: "40",
      COSTO: 31625,
      PUBLICO: 39900,
      INV: "1",
      VTA: "-1",
      ROT: -1,
      CORNER: 0,
      COLOR_ROT: "#FAFAFA",
      ESTADO: "Devolución",
    },
    {
      CODIGO: "122B01BLANCO",
      ALM: "1",
      COSTO: 31625,
      PUBLICO: 39900,
      INV: "1",
      VTA: "1",
      ROT: 30,
      CORNER: 0,
      COLOR_ROT: "#5882FA",
      ESTADO: "Rotación Alta",
    },
    {
      CODIGO: "122B01BLANCO",
      ALM: "6",
      COSTO: 31625,
      PUBLICO: 39900,
      INV: "1",
      VTA: "0",
      ROT: 0,
      CORNER: 0,
      COLOR_ROT: "#FAFAFA",
      ESTADO: "Rotación Alta",
    },
    {
      CODIGO: "122B01DORADO",
      ALM: "45",
      COSTO: 31625,
      PUBLICO: 39900,
      INV: "3",
      VTA: "0",
      ROT: 0,
      CORNER: 0,
      COLOR_ROT: "#FAFAFA",
      ESTADO: "Rotación Alta",
    },
    {
      CODIGO: "122B01BEIGE",
      ALM: "6",
      COSTO: 31625,
      PUBLICO: 39900,
      INV: "0",
      VTA: "1",
      ROT: 0,
      CORNER: 0,
      COLOR_ROT: "#FAFAFA",
      ESTADO: "Rotación Alta",
    },
    {
      CODIGO: "122B01DORADO",
      ALM: "40",
      COSTO: 31625,
      PUBLICO: 39900,
      INV: "1",
      VTA: "-1",
      ROT: -1,
      CORNER: 0,
      COLOR_ROT: "#FAFAFA",
      ESTADO: "Devolución",
    },
    {
      CODIGO: "122B01BLANCO",
      ALM: "1",
      COSTO: 31625,
      PUBLICO: 39900,
      INV: "1",
      VTA: "1",
      ROT: 30,
      CORNER: 0,
      COLOR_ROT: "#5882FA",
      ESTADO: "Rotación Alta",
    },
    {
      CODIGO: "122B01BLANCO",
      ALM: "6",
      COSTO: 31625,
      PUBLICO: 39900,
      INV: "1",
      VTA: "0",
      ROT: 0,
      CORNER: 0,
      COLOR_ROT: "#FAFAFA",
      ESTADO: "Rotación Alta",
    },
    {
      CODIGO: "122B01DORADO",
      ALM: "45",
      COSTO: 31625,
      PUBLICO: 39900,
      INV: "3",
      VTA: "0",
      ROT: 0,
      CORNER: 0,
      COLOR_ROT: "#FAFAFA",
      ESTADO: "Rotación Alta",
    },
    {
      CODIGO: "122B01BEIGE",
      ALM: "6",
      COSTO: 31625,
      PUBLICO: 39900,
      INV: "0",
      VTA: "1",
      ROT: 0,
      CORNER: 0,
      COLOR_ROT: "#FAFAFA",
      ESTADO: "Rotación Alta",
    },
    {
      CODIGO: "122B01DORADO",
      ALM: "40",
      COSTO: 31625,
      PUBLICO: 39900,
      INV: "1",
      VTA: "-1",
      ROT: -1,
      CORNER: 0,
      COLOR_ROT: "#FAFAFA",
      ESTADO: "Devolución",
    },
    {
      CODIGO: "122B01BLANCO",
      ALM: "1",
      COSTO: 31625,
      PUBLICO: 39900,
      INV: "1",
      VTA: "1",
      ROT: 30,
      CORNER: 0,
      COLOR_ROT: "#5882FA",
      ESTADO: "Rotación Alta",
    },
    {
      CODIGO: "122B01BLANCO",
      ALM: "6",
      COSTO: 31625,
      PUBLICO: 39900,
      INV: "1",
      VTA: "0",
      ROT: 0,
      CORNER: 0,
      COLOR_ROT: "#FAFAFA",
      ESTADO: "Rotación Alta",
    },
    {
      CODIGO: "122B01DORADO",
      ALM: "45",
      COSTO: 31625,
      PUBLICO: 39900,
      INV: "3",
      VTA: "0",
      ROT: 0,
      CORNER: 0,
      COLOR_ROT: "#FAFAFA",
      ESTADO: "Rotación Alta",
    },
    {
      CODIGO: "122B01BEIGE",
      ALM: "6",
      COSTO: 31625,
      PUBLICO: 39900,
      INV: "0",
      VTA: "1",
      ROT: 0,
      CORNER: 0,
      COLOR_ROT: "#FAFAFA",
      ESTADO: "Rotación Alta",
    },
    {
      CODIGO: "122B01DORADO",
      ALM: "40",
      COSTO: 31625,
      PUBLICO: 39900,
      INV: "1",
      VTA: "-1",
      ROT: -1,
      CORNER: 0,
      COLOR_ROT: "#FAFAFA",
      ESTADO: "Devolución",
    },
    {
      CODIGO: "122B01BLANCO",
      ALM: "1",
      COSTO: 31625,
      PUBLICO: 39900,
      INV: "1",
      VTA: "1",
      ROT: 30,
      CORNER: 0,
      COLOR_ROT: "#5882FA",
      ESTADO: "Rotación Alta",
    },
  ];
}
@Component({
  selector: "ngx-fs-icon",
  template: `
    <nb-tree-grid-row-toggle
      [expanded]="expanded"
      *ngIf="isDir(); else fileIcon"
    >
    </nb-tree-grid-row-toggle>
    <ng-template #fileIcon>
      <nb-icon icon="file-text-outline"></nb-icon>
    </ng-template>
  `,
})
export class FsIconComponent {
  @Input() kind: boolean;
  @Input() expanded: boolean;

  isDir(): boolean {
    return this.kind === true;
  }
}
