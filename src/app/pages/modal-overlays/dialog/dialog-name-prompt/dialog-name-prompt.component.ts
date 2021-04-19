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
  /*   get eve_imagen() {
    return this.formDataEvento.get("eve_imagen");
  } */
  get enc_pregunta(): FormArray {
    return this.formEncuesta.get("enc_pregunta") as FormArray;
  }

  agregar_pregunta() {
    this.formPregunta = this.fb.group({
      nombrePregunta: new FormControl(""),
      eve_imagen: ["", []],
      enc_respuesta: this.fb.array([]),
    });

    this.enc_pregunta.push(this.formPregunta);
    console.log(this.enc_pregunta);
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
    console.log(encuesta, this.formDataEvento);
    this.ref.close(encuesta);
  }

  //subir imagen
  fileChange(event: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: any = fileList[0];
      console.log(file)
      this.formPregunta.controls["eve_imagen"].setValue(file);


/*       this.formDataEvento.delete("eve_imagen");
      this.formDataEvento.append("eve_imagen", file, file.name); */
      //this.formEvento.controls["eve_imagen"].setValue(file)
      this.showImage(event.target);
    } else {
      this.preview = false;
    }
  }
  imageSrc:any
  onFileChange(event) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.imageSrc = reader.result as string;
        console.log(reader.result)
        this.formPregunta.patchValue({
          eve_imagen: reader.result
        });
   
      };
   
    }
  }
  imageURL: string;
    // Image Preview
    showPreview(event) {
      const file = (event.target as HTMLInputElement).files[0];
      this.formPregunta.patchValue({
        eve_imagen: file
      });
      this.formPregunta.get('eve_imagen').updateValueAndValidity()
  
      // File Preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
      }
      reader.readAsDataURL(file)
    }


  //mostrar previa de la imágen
  showImage(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = () => {
      this.preview = myReader.result;
    };
    myReader.readAsDataURL(file);
  }
  fn_callFile() {
    document.getElementById("inputfile")!.click();
  }
}
