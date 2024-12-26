import { Component } from '@angular/core';
import {FreelanceResponse} from "../../shared/model/FreelanceResponse";
import {FreelanceService} from "../../shared/services/freelance.service";
import { NzFormModule } from 'ng-zorro-antd/form';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@Component({
  selector: 'app-freelance-update',
  standalone: true,
  imports: [NzFormModule, FormsModule,  ReactiveFormsModule],
  templateUrl: './freelance-update.component.html',
  styleUrl: './freelance-update.component.css'
})
export class FreelanceUpdateComponent {
id?:number;
freelanceResponse?:FreelanceResponse

constructor(private freelanceService:FreelanceService,) {
}
  getFreelanceById(id:number) {
    this.freelanceService.getFreelanceById(id).subscribe({
      next: (data) => {
        this.freelanceResponse=data;
        console.log(this.freelanceResponse);
      },error:(err)=>{
        console.log(err)
      }
    })
  }




}
