import { Injectable } from '@angular/core';
import {EsnRequest} from "../model/EsnRequest";
import {EnsResponse} from "../model/EnsResponse";
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Base64Service} from "./base64.service";
import {UserRequest} from "../model/UserRequest";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl: string = `${environment.AUTH_ENDPOINT}`

  constructor(private http: HttpClient) {
  }
  createUser(userRequest: UserRequest) {
    return this.http.post<EnsResponse>(`${this.apiUrl}/register`, userRequest)
  }
}
