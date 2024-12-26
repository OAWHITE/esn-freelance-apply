import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FreelanceResponse} from "../model/FreelanceResponse";
import { FreelanceRequest } from '../model/FreelanceRequest';

@Injectable({
  providedIn: 'root'
})
export class FreelanceService {

  private apiUrl:string = `http://localhost:8080/freelance`
  constructor(private http:HttpClient) { }

  addFreelance(freelanceRequest:FreelanceRequest){
    return this.http.post<FreelanceResponse>(this.apiUrl,freelanceRequest)
  }
}
