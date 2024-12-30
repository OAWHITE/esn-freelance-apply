import {Component, OnInit ,Input} from '@angular/core';
import {ActivatedRoute,Router} from "@angular/router";
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
    NzButtonComponent

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
  isImageTouched:boolean = false;
  @Input() esn!: EnsResponse;
  constructor(private route: ActivatedRoute,
              private esnService:EsnService,
              private fb:FormBuilder,
              private nzNotif:NzNotificationService,
              private router: Router,
  ) {}
  ngOnInit(): void {
    if (this.esn) {
      this.esnResponse = this.esn;
      this.fillForm(this.esn);
      console.log(this.esn);
    }
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
        this.isImageTouched=true;
        this.imageUrl = URL.createObjectURL(file);

        // console.log(this.imageUrl)
      }
    })
    inpt.click();
  }

  handleUpdateEsn() {
    if((this.isImageTouched && this.formEsn.valid && this.imageFile) || (!this.isImageTouched && this.formEsn.valid)){
      const esnRequest:EsnRequest = {
        nameEns:this.formEsn.get("name")?.value,
        nameContact:this.formEsn.get("contact")?.value,
        poste:this.formEsn.get("poste")?.value,
        email:this.formEsn.get("email")?.value,
        phone:this.formEsn.get("phone")?.value,
      }
      this.esnService.updateEsn(this.esnResponse?.id  as number,this.imageFile as File,esnRequest).subscribe({
        next: (data) => {
          this.router.navigate(["/esn/list"])
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


