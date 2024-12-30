import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FreelanceResponse} from "../model/FreelanceResponse";
import { FreelanceRequest } from '../model/FreelanceRequest';
import {environment} from "../../../environments/environment.development";
import {EnsResponse} from "../model/EnsResponse";
import {Base64Service} from "./base64.service";


@Injectable({
  providedIn: 'root'
})
export class FreelanceService {

  private apiUrl: string = `${environment.BACKEND_ENDPOINT}/freelance`

  constructor(private http: HttpClient,private base64Service: Base64Service) {
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

  updateFreelance(id: number,resume:File,image:File, freelanceRequest: FreelanceRequest) {
      let formData = new FormData();
      formData.append('image', image);
      formData.append('resume', resume);
      // const freelanceRequestString = JSON.stringify(freelanceRequest);
    return this.http.put<void>(`${this.apiUrl}/${id}`, formData,{
      params:{
        freelanceRequest:this.base64Service.objectToBase64(freelanceRequest)
      }
    })
  }


  patchFreelance(id: number, freelanceRequest: FreelanceRequest) {
    return this.http.patch<void>(`${this.apiUrl}/${id}`, freelanceRequest)
  }

}
