import { Component, OnInit } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import Swal from "sweetalert2";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
@Component({
  selector: "ngx-dialog-name-prompt",
  templateUrl: "dialog-name-prompt.component.html",
  styleUrls: ["dialog-name-prompt.component.scss"],
})
export class DialogNamePromptComponent implements OnInit {
  formEncuesta: FormGroup;
  respuesta = false;
  contadorPreguntas = 1;
  aRespuestas = [];
  respuestas = "";
  preguntas = [
    {
      nombre: this.contadorPreguntas + ". " + "Pregunta",
      opciones: ["opcion1", "opcion2", "opcion3"],
    },
  ];
  ngOnInit() {
    this.formEncuesta = this.fb.group({
      nombre_encuesta: ["", [Validators.required, Validators.minLength(2)]],
      descripcion_encuesta: ["", Validators.required],
      pregunta_encuesta: this.fb.array([]),
    });
  }
  constructor(
    protected ref: NbDialogRef<DialogNamePromptComponent>,
    private fb: FormBuilder
  ) {}
  get nombre_encuesta() {
    return this.formEncuesta.get("nombre_encuesta");
  }
  get descripcion_encuesta() {
    return this.formEncuesta.get("descripcion_encuesta");
  }
  public get pregunta_encuesta() {
    return this.formEncuesta.get("pregunta_encuesta") as FormArray;
  }
  public get respuesta_encuesta() {
    return this.formEncuesta.get("respuesta_encuesta");
  }

  fn_agregarPregunta() {
    const preguntasFormGroup = this.fb.group({
      nombre_pregunta: "",
      respuesta_encuesta: ["", [Validators.required, Validators.minLength(2)]],
      /*  respuesta: this.fb.array([this.fn_agregarRespuesta()]) */
    });
    this.pregunta_encuesta.push(preguntasFormGroup);




  }
  aRespuestaOrdenadas = [];
  fn_agregarRespuesta(item) {
    console.log(item);
    console.log(this.formEncuesta.get("pregunta_encuesta").value);

    let respuesta = this.formEncuesta.get("pregunta_encuesta").value[item]
      .respuesta_encuesta;
    this.aRespuestas.push(
    
      respuesta
    );
    
    console.log(this.aRespuestas);
    /*     const preguntasFormGroup = this.fb.group({
      nombre_respuesta: "",

    });
    this.pregunta_encuesta.push(preguntasFormGroup); */
  }

  /*   fn_agregarRespuesta() {
        const respuestas_encuesta = <FormArray>(
          
      this.formEncuesta.controls["respuesta_encuesta"]
    );
    respuestas_encuesta.push(this.fb.group({ respuesta_enc: [] }));
   
    console.log(this.aRespuestas,this.formEncuesta.get("pregunta_encuesta").value);
  }
 */
  fn_eliminarPregunta(indice: number) {
    this.pregunta_encuesta.removeAt(indice);
  }

  fn_eliminarRespuesta(indice: number) {
    /*     this.respuesta_encuesta.removeAt(indice); */
  }

  fn_refrescarFormulario() {
    this.pregunta_encuesta.controls.slice(0, this.pregunta_encuesta.length);
  }

  cancel() {
    this.ref.close();
  }

  submit(name, descripcion) {
    console.log(descripcion, this.formEncuesta.get("nombre_encuesta").value);
    let preguntas = { nombre: name, descripcion: descripcion };

    this.ref.close(preguntas);
  }

  insertarPregunta() {
    this.respuesta = true;
    this.contadorPreguntas++;
    this.preguntas.push({
      nombre: this.contadorPreguntas + ". " + "Pregunta",
      opciones: ["opcion1", "opcion2", "opcion3"],
    });
  }
  insertarRespuesta(item: any) {
    console.log(item);

    item["opciones"].push("nueva opcion");

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
      title: "¿Seguro que quieres eliminar este caso?",
      text: "Si lo eliminas no podrás recuperarlo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00782B",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        /*   this.ServicesProvider.preloaderOn(); */
        console.log(id);
        let idArb = {
          id_arbol_general: id,
        };
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
    });
  }

  fn_guardarEncuesta() {
    console.log(
      this.formEncuesta.get("nombre_encuesta").value,
      this.formEncuesta.get("descripcion_encuesta").value,
      this.formEncuesta.get("pregunta_encuesta").value
    );

    this.formEncuesta.get("pregunta_encuesta").value.forEach((element) => {
      if (element.nombre_pregunta != "") {
        this.aRespuestaOrdenadas.push({
          nombre: element.nombre_pregunta,
          respuestas: this.aRespuestas,
        });
      }
      console.log(element)

    });

    let encuesta = {
      "nombre":this.formEncuesta.get("nombre_encuesta").value,
      "descripcion":this.formEncuesta.get("descripcion_encuesta").value,
      "preguntas":this.aRespuestaOrdenadas
   }

    console.log(this.aRespuestaOrdenadas);
    this.ref.close(encuesta);
  }
}
