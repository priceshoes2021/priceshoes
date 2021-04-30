import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JwtResponse } from '../models/jwt-response';
import { tap, catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { ServicesProvider } from './services';
import { SERVICES, devURL, prodURL } from './webservices';
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class AuthService {
  authSubject = new BehaviorSubject(false);
  private token: string;
  url: string;
  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
    (isDevMode()) ? this.url = devURL : this.url = prodURL;
  }

  /* Pendiente url de registro*/
  /* register(user: User): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`${this.url}${SERVICES.LOGIN}`,
      user).pipe(tap(
        (res: JwtResponse) => {
          if (res) {
            // guardar token
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
          }
        })
      );
  } */

  /* login(user_login_data: any): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`${this.url}${SERVICES.LOGIN}`,
      user_login_data).pipe(tap(
        (res: JwtResponse) => {
          if (res) {
            // guardar token por 30 días
            this.saveToken(res['Token'], 30); 
          }
        }), catchError(this.errorHandler)
      );
  } */

  /* errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "server error.");
  } */

  public logout(): void {
    this.token = '';
    /* localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN"); */
    this.cookieService.delete('usr_token');
  }

  public saveToken(token: string, expiresIn: number): void {
    this.cookieService.set('usr_token', token, expiresIn);
    this.token = token;
  }

   public getToken(): string {
    if (!this.token) {
      this.token = this.cookieService.get('usr_token')
    }
    return this.token;
  }
/*
  private setRecordarCredenciales(credentials : any){
    localStorage.setItem("remember_credentials", JSON.stringify(credentials) );
  }
  private getRecordarCredenciales(){
    return JSON.parse(localStorage.getItem("remember_credentials"));
  } */

}
