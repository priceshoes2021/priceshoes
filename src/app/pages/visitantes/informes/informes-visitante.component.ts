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
  selector: "informes-visitante",
  templateUrl: "informes-visitante.component.html",
  styleUrls: ["informes-visitante.component.scss"],
})
export class InformesVisitanteComponent implements OnInit {

  constructor(
    private service: SmartTableData,
    private dialogService: NbDialogService,
    private ServicesProvider: ServicesProvider,
    private theme: NbThemeService
  ) {
    /* const data = this.service.getData(); */



  }

  ngOnInit() {


}
}