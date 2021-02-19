import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import Swal from 'sweetalert2';
@Component({
  selector: 'ngx-dialog-name-prompt',
  templateUrl: 'dialog-name-prompt.component.html',
  styleUrls: ['dialog-name-prompt.component.scss'],
})
export class DialogNamePromptComponent {
  respuesta = false
  contadorPreguntas = 1
  preguntas = [{
    nombre: (this.contadorPreguntas) + ". " + "Pregunta",
    opciones: [
      "opcion1",
      "opcion2",
      "opcion3"
    ]

  }];

  constructor(protected ref: NbDialogRef<DialogNamePromptComponent>) { }

  cancel() {
    this.ref.close();
  }

  submit(name, descripcion) {
    console.log(descripcion)
    let preguntas = { nombre: name, descripcion: descripcion }
    this.ref.close(preguntas);

  }

  insertarPregunta() {
    this.respuesta = true
    this.contadorPreguntas++;
    this.preguntas.push({
      nombre: (this.contadorPreguntas) + ". " + "Pregunta",
      opciones: [
        "opcion1",
        "opcion2",
        "opcion3"
      ]
    })

  }
  insertarRespuesta(item: any) {
    console.log(item)

    item["opciones"].push("nueva opcion")

    /* item.forEach(element => {
      console.log(element)      
    }); */
    /*     this.preguntas.push({
          nombre : (this.contadorPreguntas) + ". " + "Pregunta",
          opcion1: "",
          opcion2: "",
          opcion3: "",
        }) */

  }

  fn_eliminarArbol(id) {
    Swal.fire({
      title: '¿Seguro que quieres eliminar este caso?',
      text: "Si lo eliminas no podrás recuperarlo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00782B',
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        /*   this.ServicesProvider.preloaderOn(); */
        console.log(id)
        let idArb = {
          id_arbol_general: id
        }
        /*           this.ServicesProvider.post(SERVICES.ELIMINAR_ARBOL, idArb).then(response => {
                    this.fn_obtenerArboles();
                    Swal.fire(
                      '!Eliminado!',
                      'Formato Eliminado con Éxito',
                      'success'
                    )
                    this.ServicesProvider.preloaderOff();
              
                  }) */

      }
    })

  }

}
