import { Component } from '@angular/core';

@Component({
  selector:'visitantes',
  styleUrls: ['./visitantes.component.scss'],
  templateUrl: './visitantes.component.html',
})
export class VisitantesComponent {
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