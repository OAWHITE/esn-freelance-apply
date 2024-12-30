import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private apiUrl: string = `${environment.AUTH_ENDPOINT}/login`
  constructor(private http: HttpClient) { }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials)


  }
}
