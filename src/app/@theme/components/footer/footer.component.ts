import { Component } from "@angular/core";

@Component({
  selector: "ngx-footer",
  styleUrls: ["./footer.component.scss"],
  template: `
    <span class="created-by"> </span>
    <div class="footer">
      <div class="support d-flex">
        <h5 class="m-r-3">Con el apoyo de:</h5>
        <img
          width="160px"
          src="assets/images/sena-support.jpeg"
          alt="support"
        />
      </div>
      <div class="socials">
        <a
          href="https://www.instagram.com/priceshoes_colombia/"
          target="_blank"
          class="ion ion-social-instagram"
        ></a>

        <a
          href="https://www.facebook.com/priceshoes.co"
          target="_blank"
          class="ion ion-social-facebook"
        ></a>

        <a
          href="https://twitter.com/PriceShoes"
          target="_blank"
          class="ion ion-social-twitter"
        ></a>
      </div>
    </div>
  `,
})
export class FooterComponent {}
