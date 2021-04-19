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
  formPregunta: FormGroup;
  formDataEvento: any = new FormData();
  respuesta = false;
  contadorPreguntas = 1;
  aRespuestas = [];
  respuestas = "";
  preview: any = false;
  formDataEncuesta:any = new FormData()
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
    private fb: FormBuilder
  ) {}

  crearFormulario() {
    this.formEncuesta = this.fb.group({
      enc_pregunta: this.fb.array([]),
      enc_nombre: ["", []],
      enc_descripcion: ["", []],
    });
  }

  get enc_nombre() {
    return this.formEncuesta.get("enc_nombre");
  }
  get enc_descripcion() {
    return this.formEncuesta.get("enc_descripcion");
  }
    get eve_imagen() {
    return this.formPregunta.get("eve_imagen");
  } 
  get enc_pregunta(): FormArray {
    return this.formEncuesta.get("enc_pregunta") as FormArray;
  }
  get nombrePregunta() {
    return this.formEncuesta.get("nombrePregunta") ;
  }

  agregar_pregunta() {
    this.formPregunta = this.fb.group({
      nombrePregunta: new FormControl(""),
      eve_imagen: ["", []],
      enc_respuesta: this.fb.array([]),
    });

    this.enc_pregunta.push(this.formPregunta);
  }

  fn_setFormData(){
    console.log(this.enc_nombre.value)
    this.formDataEncuesta.append("enc_pregunta", this.enc_pregunta.value);
    this.formDataEncuesta.append("enc_nombre", this.enc_nombre.value);
    this.formDataEncuesta.append("enc_descripcion", this.enc_descripcion.value);
    this.formDataEncuesta.append("nombrePregunta", this.nombrePregunta.value);
    this.formDataEncuesta.append("eve_imagen", this.eve_imagen.value);
    this.formDataEncuesta.append("enc_respuesta", this.enc_respuesta.value); 
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

    this.enc_respuesta.push(formRespuesta);
  }

  cancel() {
    this.ref.close();
  }

  //Guardar formulario
  fn_guardarEncuesta() {
   /*  this.fn_setFormData(); */
    console.log(this.formDataEncuesta)
    let preguntas = [];
    this.formEncuesta.get("enc_pregunta").value.forEach((element) => {
      console.log(element);
      preguntas.push({
        nombre: element.nombrePregunta,
        respuestas: element.enc_respuesta,
        image: element.eve_imagen,
      });
    });

    let encuesta = {
      nombre: this.formEncuesta.get("enc_nombre").value,
      descripcion: this.formEncuesta.get("enc_descripcion").value,
      preguntas: preguntas,
    };
/*     console.log(encuesta, this.formDataEvento); */
    this.ref.close(encuesta);
  }








//Capturar imagen

  imageURL: string;
    // Image Preview
    showPreview(event) {
      let image=[];
      const file = (event.target as HTMLInputElement).files[0];
      image.push(file)
      this.formPregunta.patchValue({
        eve_imagen: image
      });
      this.formPregunta.get('eve_imagen').updateValueAndValidity()
  
      // File Preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
      }
      reader.readAsDataURL(file)
    }



}
