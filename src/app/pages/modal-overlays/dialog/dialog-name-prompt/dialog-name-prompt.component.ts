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
import { HttpClient } from "@angular/common/http";
import { async, waitForAsync } from "@angular/core/testing";
@Component({
  selector: "ngx-dialog-name-prompt",
  templateUrl: "dialog-name-prompt.component.html",
  styleUrls: ["dialog-name-prompt.component.scss"],
})
export class DialogNamePromptComponent implements OnInit {
  formEncuesta: FormGroup;
  formPregunta: FormGroup;
  formDataEvento: any = new FormData();
  respuesta = false;
  contadorPreguntas = 1;
  aRespuestas = [];
  respuestas = "";
  preview: any = false;

  questionType = [
    { id: "si-no", name: "Si / No" },
    { id: "calificacion-emoji", name: "Selección única emojis" },
    { id: "opciones-unica", name: "Selección única opciones" },
    { id: "opciones-multiple", name: "Selección multiple opciones" },
    { id: "abierta", name: "Pregunta abierta" },
  ];

  preguntas = [
    {
      nombre: this.contadorPreguntas + ". " + "Pregunta",
      opciones: ["opcion1", "opcion2", "opcion3"],
    },
  ];
  ngOnInit() {
    this.crearFormulario();
  }
  constructor(
    protected ref: NbDialogRef<DialogNamePromptComponent>,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  crearFormulario() {
    this.formEncuesta = this.fb.group({
      enc_pregunta: this.fb.array([]),
      enc_nombre: ["", []],
      enc_descripcion: ["", []],
      enc_mensaje: ["", []],
    });
  }

  get enc_nombre() {
    return this.formEncuesta.get("enc_nombre");
  }
  get enc_descripcion() {
    return this.formEncuesta.get("enc_descripcion");
  }
  get enc_mensaje() {
    return this.formEncuesta.get("enc_mensaje");
  }
  get eve_imagen() {
    return this.formPregunta.get("eve_imagen");
  }
  get enc_pregunta(): FormArray {
    return this.formEncuesta.get("enc_pregunta") as FormArray;
  }
  get nombrePregunta() {
    return this.formEncuesta.get("nombrePregunta");
  }
  get tipoPregunta() {
    return this.formEncuesta.get("tipoPregunta");
  }
  get porquePregunta() {
    return this.formEncuesta.get("porquePregunta");
  }

  agregar_pregunta() {
    this.formPregunta = this.fb.group({
      nombrePregunta: new FormControl(""),
      tipoPregunta: new FormControl(""),
      porquePregunta: new FormControl(false),
      eve_imagen: ["", []],
      enc_respuesta: this.fb.array([]),
    });

    this.enc_pregunta.push(this.formPregunta);
  }

  borrarPregunta(indice: number) {
    this.enc_pregunta.removeAt(indice);
  }
  borrarRespuesta(indice: number) {
    this.enc_respuesta.removeAt(indice);
  }

  get enc_respuesta(): FormArray {
    return this.formPregunta.get("enc_respuesta") as FormArray;
  }

  agregar_respuesta() {
    const formRespuesta = this.fb.group({
      nombreRespuesta: new FormControl(""),
    });
    console.log(formRespuesta);

    this.enc_respuesta.push(formRespuesta);
  }

  cancel() {
    this.ref.close();
  }

  //Guardar formulario
  fn_guardarEncuesta() {
    let preguntas = [];
    let respuestas = [];

    this.formEncuesta.get("enc_pregunta").value.forEach((element) => {
      console.log(element);
      element.enc_respuesta.forEach((element2) => {
        console.log(element2.nombreRespuesta);
        respuestas.push(element2.nombreRespuesta);
      });

      console.log(respuestas);
      preguntas.push({
        nombre: element.nombrePregunta,
        tipo: element.tipoPregunta,
        porque:element.porquePregunta,
        respuestas: respuestas,
        image: element.eve_imagen,
      });
      respuestas = [];
    });

    let encuesta = {
      nombre: this.formEncuesta.get("enc_nombre").value,
      descripcion: this.formEncuesta.get("enc_descripcion").value,
      mensaje: this.formEncuesta.get("enc_mensaje").value,
      preguntas: preguntas,
      n_preguntas: preguntas.length,
    };
    /*     console.log(encuesta, this.formDataEvento); */
    this.ref.close(encuesta);
  }

  submit() {}

  //Capturar imagen

  imageURL: string;
  image;
  // Image Preview
  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    var formData: any = new FormData();
    formData.append("image", file);
    this.http
      .post("https://apipriceshoes.herokuapp.com/image-upload", formData)
      .subscribe(
        (response) =>
          this.formPregunta.patchValue({
            eve_imagen: response["imageUrl"],
          }),

        (error) => console.log(error)
      );

    this.formPregunta.get("eve_imagen").updateValueAndValidity();

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
