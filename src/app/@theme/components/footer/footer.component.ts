import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
    <a href="https://www.sena.edu.co/es-co/Empresarios/Paginas/SENA-INNOVA-2021.aspx" target="_blank"><img style="width: 40%; border-radius: 10px;" src="../../../assets/images/logoInnova.jpg"></a>
    </span>
    <div class="socials">
    
      <a href="https://www.facebook.com/priceshoes.co" target="_blank" class="ion ion-social-facebook"></a>
      <a href="https://twitter.com/PriceShoesCO?fbclid=IwAR1odjnIlEHq0-7IpazaNXEhZaWjhPVkMOHBUwoi6Ng_qUfJGp3_ynNZ17Y" target="_blank" class="ion ion-social-twitter"></a>
    </div>
  `,
})
export class FooterComponent {
}
