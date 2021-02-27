import { Component, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';
import { SmartTableData } from '../../../@core/data/smart-table';
import { DialogNamePromptComponent } from '../../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component';
import { ShowcaseDialogComponent } from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { NbDialogService } from '@nebular/theme';
@Component({
    selector: 'ngx-accordion',
    templateUrl: 'aplicar-encuestas.component.html',
    styleUrls: ['aplicar-encuestas.component.scss'],
})
export class AplicarEncuestaComponent {

    constructor(private service: SmartTableData, private dialogService: NbDialogService) {
    }




}
