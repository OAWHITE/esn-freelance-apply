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
  freelanceForm!: FormGroup;
  imageUrl: string = '';
  imageFile?: File;
  showImageError: boolean = false;

  constructor(
    private freelanceService: FreelanceService,
    private fb: FormBuilder,
    private router: Router,
    private nzNotif: NzNotificationService
  ) {}

  ngOnInit() {
    this.initFreelanceForm();
  }

  private initFreelanceForm(): void {
    this.freelanceForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      intitule: [null, [Validators.required, Validators.minLength(3)]],
      competences: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    });
  }

  handleAddFreelance(): void {
    if (this.freelanceForm.valid && this.imageFile) {
      const freelanceRequest: FreelanceRequest = {
        name: this.freelanceForm.get('name')?.value,
        intitule: this.freelanceForm.get('intitule')?.value,
        competences: this.freelanceForm.get('competences')?.value,
        email: this.freelanceForm.get('email')?.value,
        phone: this.freelanceForm.get('phone')?.value,
      };

      this.freelanceService.addFreelance(freelanceRequest).subscribe({
        next: (data) => {
          this.freelanceService.uploadImage(data.id, this.imageFile as File).subscribe({
            next: () => {
              this.nzNotif.success("Success", "Freelance added successfully");
              this.router.navigate(["/"]);
            },
            error: (err) => {
              console.error("Error uploading image:", err);
              this.nzNotif.error("Error", "Failed to upload image. Please try again.");
            },
          });
        },
        error: (err) => {
          console.error("Error adding Freelance:", err);
          this.nzNotif.error("Error", "Failed to add freelance. Please check the form and try again.");
        },
      });
    } else {
      if (!this.imageFile) {
        this.showImageError = true;
      }
      console.log("Form Errors:", this.getAllErrors(this.freelanceForm));
      this.nzNotif.error("Error", "Please complete all required fields and try again.");
    }
  }

  private getAllErrors(formGroup: FormGroup): { [key: string]: any } {
    const errors: { [key: string]: any } = {};
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      if (control && control.errors) {
        errors[key] = control.errors;
      }
    });
    return errors;
  }

  importImage(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        this.imageFile = file;
        this.showImageError = false;
        this.imageUrl = URL.createObjectURL(file);
      }
    });
    input.click();
  }
}
