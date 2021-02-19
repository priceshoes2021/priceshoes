import { Component } from '@angular/core';

@Component({
  selector: 'compras',
  styleUrls: ['./compras.component.scss'],
  templateUrl: './compras.component.html',
})
export class ComprasComponent {
  tabs: any[] = [
    {
      title: 'Route tab #1',
      route: '/pages/layout/tabs/tab1',
    },
    {
      title: 'Route tab #2',
      route: '/pages/layout/tabs/tab2',
    },
  ];
}

