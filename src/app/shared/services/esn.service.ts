import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {EsnRequest} from '../model/EsnRequest';
import {EnsResponse} from "../model/EnsResponse";
import {environment} from "../../../environments/environment.development";
import {FreelanceRequest} from "../model/FreelanceRequest";
import {Base64Service} from "./base64.service";

@Injectable({
  providedIn: 'root'
})
export class EsnService {

  private apiUrl: string = `${environment.BACKEND_ENDPOINT}/ens`

  constructor(private http: HttpClient,private base64Service: Base64Service) {
  }




  getEns() {
    return this.http.get<EnsResponse[]>(this.apiUrl)
  }

  addEsn(esnRequest: EsnRequest) {
    return this.http.post<EnsResponse>(this.apiUrl, esnRequest)
  }


  uploadImage(id: number, file: File) {
    let formData = new FormData();
    formData.append('file', file);
    return this.http.post<void>(`${this.apiUrl}/${id}/file`, formData )

  }
  ensDelete(id: number) {
    return this.http.delete<void>(`${this.apiUrl}`,{params:{id:id}})
  }
  esnGetById(id:number) {
    return this.http.get<EnsResponse>(`${this.apiUrl}/${id}`)
  }

  updateEsn(id: number,image:File, esnRequest: EsnRequest) {
    let formData = new FormData();
    formData.append('image', image);

    // const esnRequestString = JSON.stringify(esnRequest);
    return this.http.put<void>(`${this.apiUrl}/${id}`, formData,{
      params:{
        ensRequest:this.base64Service.objectToBase64(esnRequest)
      }
    })
  }




}
