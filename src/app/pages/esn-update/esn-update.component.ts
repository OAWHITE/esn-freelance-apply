import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EnsResponse} from "../../shared/model/EnsResponse";
import {EsnService} from "../../shared/services/esn.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzFormItemComponent, NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {FreelanceRequest} from "../../shared/model/FreelanceRequest";
import {EsnRequest} from "../../shared/model/EsnRequest";


@Component({
  selector: 'app-esn-update',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzSelectComponent,
    NzOptionComponent,
    NzFormItemComponent,
    NzInputModule,
    NzButtonComponent,

  ],
  templateUrl: './esn-update.component.html',
  styleUrl: './esn-update.component.css'
})
export class EsnUpdateComponent implements OnInit {
  id? :number  ;
  formEsn!: FormGroup;
  esnResponse?:EnsResponse;
  imageUrl: string = '';
  imageFile? :File;
  showImageError:boolean = false;
  constructor(private route: ActivatedRoute,
              private esnService:EsnService,
              private fb:FormBuilder,
              private nzNotif:NzNotificationService
  ) {}
  ngOnInit() {
    this.esnResponse= this.route.snapshot.data["esnResponse"]
    this.fillForm(this.esnResponse as EnsResponse);
    console.log()
  }

  fillForm(esnResponse:EnsResponse){
    this.formEsn =  this.fb.group({
      name: [esnResponse.nameEns, [Validators.required, Validators.minLength(3)]],
      contact: [esnResponse.nameContact, [Validators.required, Validators.minLength(3)]],
      poste: [esnResponse.poste, [Validators.required]],
      email: [esnResponse.email, [Validators.required, Validators.email]],
      phone: [esnResponse.phone, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    });
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

  handleUpdateEsn() {
    if(this.formEsn.valid && this.imageFile ){
      const esnRequest:EsnRequest = {
        nameEns:this.formEsn.get("name")?.value,
        nameContact:this.formEsn.get("contact")?.value,
        poste:this.formEsn.get("poste")?.value,
        email:this.formEsn.get("email")?.value,
        phone:this.formEsn.get("phone")?.value,
      }

      this.esnService.updateEsn(this.esnResponse?.id as number,this.imageFile,esnRequest).subscribe({
        next: (data) => {
          console.log("updated successffuly")
          this.nzNotif.success('Success', 'Esn updated successfully');

        },error:err =>
        {
          console.error("an error occured ", err)
          this.nzNotif.error('Error', 'An error occurred while updating the Esn data');

        }
      })
    }
  }
}


