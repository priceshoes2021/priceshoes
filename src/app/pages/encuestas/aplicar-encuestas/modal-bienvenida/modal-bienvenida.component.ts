import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "modal-bienvenida",
  templateUrl: "./modal-bienvenida.component.html",
  styleUrls: ["./modal-bienvenida.component.scss"],
})
export class ModalBienvenidaComponent implements OnInit {
  mensajeBienvenida: string = "";
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) welcomeMessage
  ) {
    this.mensajeBienvenida = welcomeMessage;
  }

  ngOnInit(): void {
  }

  closeSucces() {}

  closeDialog() {
    this.dialog.closeAll();
  }
}
