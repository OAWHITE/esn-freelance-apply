import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { EsnService } from '../../shared/services/esn.service';
import { EsnRequest } from '../../shared/model/EsnRequest';
import { Router } from "@angular/router";
import { EnsResponse } from '../../shared/model/EnsResponse';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {NzInputModule} from "ng-zorro-antd/input";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-esn-form',
  standalone: true,
  imports: [NzFormModule, ReactiveFormsModule, NzFormModule, NzSelectModule, NzButtonModule, NzUploadModule, NzInputModule, TranslatePipe],
  templateUrl: './esn-form.component.html',
  styleUrls: ['./esn-form.component.css'],
})
export class EsnFormComponent implements OnInit {
  formEsn!: FormGroup;
  emailValue: string = '';
  ensData: EnsResponse[] = [];

  imageUrl: string = '';
  imageFile? :File;
  showImageError:boolean = false;


  constructor(
    private esnService: EsnService,
    private fb: FormBuilder,
    private router: Router,
    private nzNotif:NzNotificationService,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.initEsnForm();
    this.listEns();

  }

  listEns() {
    this.esnService.getEns().subscribe({
      next: (data) => {
        this.ensData = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  private initEsnForm(): void {
    this.formEsn = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      contact: [null, [Validators.required, Validators.minLength(3)]],
      poste: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    });
  }

  handleAddEsn() {
    if (this.formEsn.valid && this.imageFile) {
      const esnRequest: EsnRequest = {
        nameEns: this.formEsn.get('name')?.value,
        nameContact: this.formEsn.get('contact')?.value,
        poste: this.formEsn.get('poste')?.value,
        email: this.formEsn.get('email')?.value,
        phone: this.formEsn.get('phone')?.value,
      };

      this.esnService.addEsn(esnRequest).subscribe({
        next: (data) => {
            this.esnService.uploadImage(data.id,this.imageFile as File).subscribe({
              next:()=>{

                this.nzNotif.success($localize`:@@esn.form.info:Information`, $localize`:@@esn.form.addEsn:Esn Applied Successffully`);



                this.router.navigate(["/"]);
              },error:(err)=>{
                console.log("an error occurred while uploading image ", err);
              }
            })
        },
        error: (err) => {
          console.error('Error adding ESN:', err);
        },
      });
    } else {
      //if the file is not assigned  or choosed  need to show a red border
      if(!this.imageFile){
        this.showImageError = true;
      }
      console.log(this.getAllErrors(this.formEsn));

        this.nzNotif.success($localize`:@@esn.form.error:Error`, $localize`:@@esn.form.adderror:an error occurred while adding esn, be sure that all fields is filled correctly ? please try again`);


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
    return (this.formEsn.get(key)?.errors!=null && this.formEsn.get(key)?.touched) as boolean;
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
