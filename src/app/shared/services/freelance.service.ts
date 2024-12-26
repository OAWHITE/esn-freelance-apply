import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FreelanceResponse} from "../model/FreelanceResponse";
import { FreelanceRequest } from '../model/FreelanceRequest';
import {environment} from "../../../environments/environment.development";
import {EnsResponse} from "../model/EnsResponse";


@Injectable({
  providedIn: 'root'
})
export class FreelanceService {

  private apiUrl: string = `${environment.BACKEND_ENDPOINT}/freelance`

  constructor(private http: HttpClient) {
  }


  getFreelanceById(id:number){
    return this.http.get<FreelanceResponse>(`${this.apiUrl}/${id}`)
  }

  getFreelance() {
    return this.http.get<FreelanceResponse[]>(this.apiUrl)
  }

  addFreelance(freelanceRequest: FreelanceRequest) {
    return this.http.post<FreelanceResponse>(this.apiUrl, freelanceRequest)
  }

  uploadImage(id: number, file: File) {
    let formData = new FormData();
    formData.append('image', file);
    return this.http.post<void>(`${this.apiUrl}/${id}/image`, formData)

  }

  freelanceDelete(id: number) {
    return this.http.delete<void>(`${this.apiUrl}`, {params: {id: id}})
  }

  updateFreelance(id: number, freelanceRequest: FreelanceRequest) {
    return this.http.put<void>(`${this.apiUrl}/${id}`, freelanceRequest)
  }


  patchFreelance(id: number, freelanceRequest: FreelanceRequest) {
    return this.http.patch<void>(`${this.apiUrl}/${id}`, freelanceRequest)
  }

}
