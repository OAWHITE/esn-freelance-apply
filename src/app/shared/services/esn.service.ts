import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {EsnRequest} from '../model/EsnRequest';
import {EnsResponse} from "../model/EnsResponse";
import {environment} from "../../../environments/environment.development";


@Injectable({
  providedIn: 'root'
})
export class EsnService {

  private apiUrl: string = `${environment.BACKEND_ENDPOINT}/ens`

  constructor(private http: HttpClient) {
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




}
