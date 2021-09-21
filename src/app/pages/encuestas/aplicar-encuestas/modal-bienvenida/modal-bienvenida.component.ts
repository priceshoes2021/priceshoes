import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "modal-bienvenida",
  templateUrl: "./modal-bienvenida.component.html",
  styleUrls: ["./modal-bienvenida.component.scss"],
})
export class ModalBienvenidaComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  closeSucces(){
    
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
