import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import {FreelanceRequest} from "../../shared/model/FreelanceRequest";
import { FreelanceService } from '../../shared/services/freelance.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-freelance-form',
  standalone: true,
  imports: [NzFormModule,FormsModule,NzSelectModule,NzButtonModule,NzUploadModule,ReactiveFormsModule],
  templateUrl: './freelance-form.component.html',
  styleUrl: './freelance-form.component.css'
})
export class FreelanceFormComponent implements OnInit {
  listOfOption: string[] = [
    "a","b","c"
  ];

  freelanceForm!:FormGroup;

  constructor(private freelanceService:FreelanceService,
    private fb:FormBuilder,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.initFreelanceForm();
  }

  initFreelanceForm() {
    this.freelanceForm = this.fb.group({
      name:[null,[Validators.required,Validators.minLength(3)]],
      intitule:[null,[Validators.required,Validators.minLength(3)]],
      competences:[null,[Validators.required]],
      email:[null,[Validators.required,Validators.email]],
      phone:[null,[Validators.required,Validators.pattern(/^[0-9]{10}$/)]],
    })
  }

  handleAddFreelance() {
    if(this.freelanceForm.valid){
      //do something here
      const freelanceRequest:FreelanceRequest = {
        name :this.freelanceForm.get("name")?.value,
        intitule:this.freelanceForm.get("intitule")?.value,
        competences:this.freelanceForm.get("competences")?.value,
        email:this.freelanceForm.get("email")?.value,
        phone:this.freelanceForm.get("phone")?.value,

      }
      console.log('try to insert this ',freelanceRequest)
      this.freelanceService.addFreelance(freelanceRequest).subscribe({
        next:(freelanceRequest:FreelanceRequest)=>{
          this.router.navigate(['/'])

        },error:(err)=>{
          console.log('there is an error while inserting freelance ');
        }
      })
    
    }else{
      //trigger some notification  error
      console.log(this.freelanceForm.errors)
    }
  }


}
