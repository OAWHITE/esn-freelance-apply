import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EsnRequest } from '../model/EsnRequest';
import {EnsResponse} from "../model/EnsResponse";

@Injectable({
  providedIn: 'root'
})
export class EsnService {

  private apiUrl:string = `http://localhost:8080/ens`

  constructor(private http:HttpClient) { }



  addEsn(esnRequest:EsnRequest){
    return this.http.post<EnsResponse>(this.apiUrl,esnRequest)
  }}
