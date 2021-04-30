import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;
  //titulos ["ADMINISTRACIÓN","FINANZAS", "RRHH", "COMERCIAL"]

  constructor() {
    console.log(this.menu)
    switch (localStorage.getItem("rol")) {
      case "1": //Administrador
      console.log("entre a 1")
      this.hideElementosNavegacion(["FINANZAS", "FINANZAS", "COMERCIAL", "RRHH", "Puntos de Venta", "Compras", "Seguimiento",  "Gestión de Empleados", "Plataformas", "B2CHAT", "CRM"], true, ["Gestionar Encuestas", "Asignar Encuestas", "Informes Encuesta", "Consultar Presupuesto", "Asignar Presupuesto", "Gestionar Metas", "Gestionar Metas","Gestionar Tiendas", "Solicitar Inventario", "Consultar Solicitudes","Consultar Pedidos","Rotación", "Informes Inventario"])
        break;
      case "2": // Asesor
      console.log("entre a 2")
      this.hideElementosNavegacion(["Auditorías",  "Visitantes", "Inventario", "Seguimiento", "Compras", "Gestión de Empleados", "Plataformas", "B2CHAT", "CRM", "FINANZAS", "RRHH", "COMERCIAL"], true, ["Gestionar Encuestas", "Asignar Encuestas", "Informes Encuesta", "Consultar Presupuesto", "Asignar Presupuesto", "Gestionar Metas", "Gestionar Metas","Gestionar Tiendas"])
        break;
      case "3": //Directivo
      console.log("entre a 3")
        break;
      case "4": //Invitado  
      console.log("entre a 4")
      this.hideElementosNavegacion(["Auditorías",  "Visitantes", "Inventario", "Seguimiento", "Puntos de Venta", "Compras", "Gestión de Empleados", "Plataformas", "B2CHAT", "CRM", "FINANZAS", "RRHH", "COMERCIAL"], true, ["Gestionar Encuestas","Asignar Encuestas", "Informes Encuesta"])
        break;

      default:
        break;
    }
/*     if (localStorage.getItem("rol") != "Administracion") {
      this.hideElementosNavegacion(["Encuestas", "Gestionar Casos", "Crear Modelo", "Gestionar Modelos"], false)
    } */
  }
  hideElementosNavegacion(nombresElementosNav: string[], bloquearHijos: boolean , children?:string[] ) {

    switch (bloquearHijos) {
      case true:
        this.menu.forEach(item => {
          if (nombresElementosNav.includes(item.title) ) {
            item['hidden'] = true
          }else{
            if (item.children) {
              item.children.forEach(element => {
                if (children.includes(element.title) ) {
                  console.log("entre aqui", element.title)
                  element['hidden'] = true
                }
              });
              
            }
          }
        });
        break;
        case false:
          this.menu.forEach(item => {
            if (nombresElementosNav.includes(item.title) ) {
              item['hidden'] = true
            }
          });
          break
    
      default:
        break;
    }


  }
}
