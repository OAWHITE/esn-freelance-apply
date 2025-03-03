
import {inject, Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {Observable} from "rxjs";
import {UserDto} from "../model/UserDto";
import {LoginRequest} from "../model/LoginRequest";
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl: string = `${environment.AUTH_ENDPOINT}`
  constructor(private http: HttpClient,
              @Inject(DOCUMENT) private document: Document,
              ) { }

  login(credentials:LoginRequest){
    return this.http.post<UserDto>(`${this.apiUrl}/login`, credentials)
  }

  validateToken(token: string){
    return this.http.post<UserDto>(`${this.apiUrl}/validate-token`, null,{params:{token: token}})
  }
  logout() {
    return this.http.post(`${this.apiUrl}/logout`,null);
  }

  clearSession(): void {
    document.defaultView?.localStorage?.removeItem('access_token');
  }
}
