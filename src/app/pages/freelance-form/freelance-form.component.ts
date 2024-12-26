import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import {FreelanceRequest} from "../../shared/model/FreelanceRequest";
import { FreelanceService } from '../../shared/services/freelance.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {NzInputDirective} from "ng-zorro-antd/input";

@Component({
  selector: 'app-freelance-form',
  standalone: true,
  imports: [NzFormModule, FormsModule, NzSelectModule, NzButtonModule, NzUploadModule, ReactiveFormsModule, NzInputDirective],
  templateUrl: './freelance-form.component.html',
  styleUrl: './freelance-form.component.css'
})
export class FreelanceFormComponent implements OnInit {
  listOfOption: string[] = [
    "a","b","c"
  ];
  imageUrl: string = '';
  imageFile? :File;
  freelanceForm!:FormGroup;
  showImageError:boolean= false;
  constructor(
    private freelanceService:FreelanceService,
    private fb:FormBuilder,
    private router: Router,
    private nzNotif:NzNotificationService,
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
      this.freelanceService.addFreelance(freelanceRequest).subscribe({
        next:(data)=>{
          this.freelanceService.uploadImage(data.id , this.imageFile as File).subscribe({
              next:()=>{
                this.nzNotif.success("Information","Esn Applied Successffully")
                this.router.navigate(["/"]);
              },error:(err)=>{
              console.log("an error occurred while uploading image ", err);
            }
          })
        },
        error: (err) => {
          console.error('Error adding Freelance:', err);
        },
      });
    } else {
      //if the file is not assigned  or choosed  need to show a red border
      if(!this.imageFile){
        this.showImageError = true;
      }
      console.log(this.getAllErrors(this.freelanceForm));
      this.nzNotif.error("an error occurred ", "an error occurred while adding freelance, be sure that all fields is filled correctly ? please try again");
    }
  }

  getAllErrors(formGroup: FormGroup): { [key: string]: any } {
    const errors: { [key: string]: any } = {};
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control && control.errors) {
        errors[key] = control.errors;
      }
      // If it's a FormGroup or FormArray, you may need a recursive call:
      if (control instanceof FormGroup) {
        errors[key] = this.getAllErrors(control);
      }
    });
    return errors;
  }
    getStatusFor(key:string):boolean{
      return (this.freelanceForm.get(key)?.errors!=null && this.freelanceForm.get(key)?.touched) as boolean;
    }

  importImage(){
    const inpt = document.createElement('input');
    inpt.type = 'file';
    inpt.accept = 'image/*';
    inpt.addEventListener('change', (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        this.imageFile = file;
        this.showImageError =false;
        this.imageUrl = URL.createObjectURL(file);
      }
    })
    inpt.click();
  }
}
