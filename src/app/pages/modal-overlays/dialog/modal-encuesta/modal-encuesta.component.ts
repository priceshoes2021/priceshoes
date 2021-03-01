import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SERVICES } from "../../../../config/webservices";
import { ServicesProvider } from "../../../../config/services";
import { NbDateService } from '@nebular/theme';
@Component({
  selector: 'modal-encuesta',
  templateUrl: 'modal-encuesta.component.html',
  styleUrls: ['modal-encuesta.component.scss'],
})
export class ModalEncuestaComponent implements OnInit {
  formAsignarEncuesta: FormGroup;
  respuesta = false
  contadorPreguntas = 1
  aRespuestas = []
  respuestas = ""
  preguntas = [{
    nombre: (this.contadorPreguntas) + ". " + "Pregunta",
    opciones: [
      "opcion1",
      "opcion2",
      "opcion3"
    ]

  }];
  ngOnInit() {
    this.formAsignarEncuesta = this.fb.group({
      id_tienda: ['', [Validators.required, Validators.minLength(2)]],
      id_encuesta: ['', Validators.required],
      fechas_asignar: ['', Validators.required],

    });

    this.fn_listarTienda()
  }
  constructor(protected ref: NbDialogRef<ModalEncuestaComponent>, private fb: FormBuilder, private ServicesProvider: ServicesProvider, protected dateService: NbDateService<Date>) {


  }

  get id_tienda() {
    return this.formAsignarEncuesta.get("id_tienda")
  }
  get id_encuesta() {
    return this.formAsignarEncuesta.get("id_encuesta")
  }


  public get fechas_asignar() {
    return this.formAsignarEncuesta.get("fechas_asignar")
  }


  fn_refrescarFormulario() {
    
  }


  cancel() {
    this.ref.close();
  }

  submit(name, descripcion) {
    console.log(descripcion, this.formAsignarEncuesta.get("nombre_encuesta").value)
    let preguntas = { nombre: name, descripcion: descripcion }

    this.ref.close(preguntas);

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

  fn_guardarEncuesta() {
    /*  console.log(this.encuesta.get("nombre_encuesta").value, this.encuesta.get("descripcion_encuesta").value) */
    console.log(this.id_tienda.value)
    console.log(this.fechas_asignar.value)
    let encuesta_asignada={
      id_tienda: this.id_tienda.value,
      fechaApertura:this.fechas_asignar.value['start'],
      fechaCierre:this.fechas_asignar.value['end']
    }
    this.ref.close(encuesta_asignada);
    
  }


  aTiendas: any
  fn_listarTienda() {
    this.ServicesProvider.get(SERVICES.LISTAR_TIENDAS, {}).then(response => {
      this.aTiendas = response
      console.log(response);
    });
  }

 fn_asignarEncuesta(){

 }

}
