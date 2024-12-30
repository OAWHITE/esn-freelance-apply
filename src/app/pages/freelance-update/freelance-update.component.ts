import {Component, OnInit} from '@angular/core';
import {FreelanceResponse} from "../../shared/model/FreelanceResponse";
import {FreelanceService} from "../../shared/services/freelance.service";
import {NzFormModule} from 'ng-zorro-antd/form';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {ActivatedRoute, Router} from "@angular/router";
import {FreelanceRequest} from "../../shared/model/FreelanceRequest";
import {NzButtonModule} from "ng-zorro-antd/button";
import {immediateProvider} from "rxjs/internal/scheduler/immediateProvider";


@Component({
  selector: 'app-freelance-update',
  standalone: true,
  imports: [NzFormModule, FormsModule, ReactiveFormsModule, NzOptionComponent, NzSelectComponent, NzInputModule, NzButtonModule],
  templateUrl: './freelance-update.component.html',
  styleUrl: './freelance-update.component.css'
})
export class FreelanceUpdateComponent implements OnInit {
  id?: number;
  freelanceResponse?: FreelanceResponse;
  formFreelance!: FormGroup;
  imageFile?: File;
  showImageError: boolean = false;
  showResumeError: boolean = false;
  existsImage:boolean = false;
  existsResume:boolean=false;
  imageUrl: string = '';
  resumeFile!: File;


  constructor(private freelanceService: FreelanceService,
              private fb: FormBuilder,
              private nzNotif: NzNotificationService,
              private route: ActivatedRoute,
              private router: Router,) {
  }

  ngOnInit() {
    this.freelanceResponse = this.route.snapshot.data["freelanceResponse"]
    this.fillForm(this.freelanceResponse as FreelanceResponse);
  }

  fillForm(freelanceResponse: FreelanceResponse) {

    this.formFreelance = this.fb.group({
      name: [freelanceResponse.name, [Validators.required, Validators.minLength(3)]],
      intitule: [freelanceResponse.intitule, [Validators.required, Validators.minLength(3)]],
      competences: [freelanceResponse.competences?.split(","), [Validators.required]],
      email: [freelanceResponse.email, [Validators.required, Validators.email]],
      phone: [freelanceResponse.phone, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    })
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
        this.existsImage=true;
        this.showResumeError =false;
        this.imageUrl = URL.createObjectURL(file);
      }
    })
    inpt.click();
  }


  importResume() {
    let inptElement =document.createElement("input")
    inptElement.type = 'file';
    inptElement.accept = 'application/pdf';

    inptElement.addEventListener('change', (event) => {
      let target = event.target as HTMLInputElement;

      if (target.files && target.files.length > 0) {
        this.resumeFile = target.files[0];
        this.existsResume=true;
      }
    })
    inptElement.click();
  }

  handleUpdateFreelace() {
    if ((this.existsImage && this.existsResume && this.formFreelance.valid && this.imageFile && this.resumeFile) ||(this.existsImage && this.formFreelance.valid || this.existsResume && this.formFreelance.valid)) {
      const freelanceRequest: FreelanceRequest = {
        name: this.formFreelance.get("name")?.value,
        competences: this.formFreelance.get("competences")?.value,
        intitule: this.formFreelance.get("intitule")?.value,
        email: this.formFreelance.get("email")?.value,
        phone: this.formFreelance.get("phone")?.value,
      }

      this.freelanceService.updateFreelance(this.freelanceResponse?.id as number, this.resumeFile, this.imageFile as File, freelanceRequest).subscribe({
        next: (data) => {
          console.log("updated successffuly")
          this.nzNotif.success('Success', 'Freelance updated successfully');
          this.router.navigate(["/freelance/list"])

        }, error: err => {
          console.error("an error occured ", err)
          this.nzNotif.error('Error', 'An error occurred while updating the freelance data');
        }
      })
    } else {
      console.log("there is an error in form or  file ", this.imageFile, this.formFreelance.controls)
      if(this.imageFile==null){
        this.showImageError = true;
      }
      if(this.resumeFile==null){
        this.showResumeError = true;
      }
    }

  }


}
