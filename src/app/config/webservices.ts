export const URL = "https://apipriceshoes.herokuapp.com/";
//export const URL = "http://localhost:3000/";
export const SERVICES = {
  LISTAR_TIENDAS: "tiendas",
  //Encuestas
  LISTAR_ENCUESTAS: "tipoencuestas/",
  AGREGAR_ENCUESTAS: "encuesta/save/",
  ELIMINAR_ENCUESTA: "encuesta/delete/",
  ASIGNAR_ENCUESTA: "encuesta/asignar/",
  LISTAR_ENCUESTAS_ASIGNADAS: "encuestas/asignadas/",
  MOSTRAR_ENCUESTA_ASIGNADA: "encuesta/",
  EDITAR_ENCUESTA_ASIGNADA: "asignar/edit/",
  ELIMINAR_ENCUESTA_ASIGNADA: "encuesta/asign/delete/",
  LLENAR_ENCUESTA: "encuesta/llenar/",
  MOSTRAR_ENCUESTA: "encuesta/",
  LISTAR_ENCUESTAS_SOLUCIONADA: "encuestas/solucion/",
  //Inventarios
  LISTAR_ROTACIONES: "rotacion/invetario/",
  LISTAR_CORNERS: "corner/all/",
  AGREGAR_CORNER: "corner/add/",
  EDITAR_CORNER: "corner/update/",
  ELIMINAR_CORNER: "corner/delete/",

  //Login
  LOGIN: "login",

  SET_JWT_TOKEN: "",
  VERIFY_JWT_TOKEN: "",
};
