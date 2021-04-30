/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService, private seoService: SeoService,private authService: NbAuthService) {
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
      console.log(token['token'].token)
      if (token.isValid()) {
        console.log(token.getPayload())
        
         localStorage.setItem("token", token['token']);
         localStorage.setItem("rol", token.getPayload().data['rol']);
         localStorage.setItem("nombre", token.getPayload().data['nombre']+ " "+token.getPayload().data['apellido']); // here we receive a payload from the token and assigns it to our `user` variable 
         localStorage.setItem("tienda", token.getPayload().data['tienda']);
         localStorage.setItem("nombre_tienda", token.getPayload().data['nombre_tienda']);
         localStorage.setItem("nombre_rol", token.getPayload().data['nombre_rol']);

      }

    });

  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
  }
}
