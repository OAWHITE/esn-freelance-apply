import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FreelanceResponse } from "../../shared/model/FreelanceResponse";
import { FreelanceService } from "../../shared/services/freelance.service";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

import { NzOptionComponent, NzSelectComponent } from "ng-zorro-antd/select";
import { NzFormItemComponent, NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { NzButtonComponent } from "ng-zorro-antd/button";

@Component({
  selector: 'app-freelance-update',
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
  templateUrl: './freelance-update.component.html',
  styleUrl: './freelance-update.component.css'
})
export class FreelanceUpdateComponent implements OnInit {
  id?: number;
  formFreelance!: FormGroup;
  freelanceResponse?: FreelanceResponse;
  imageUrl: string = '';
  imageFile?: File;
  showImageError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private freelanceService: FreelanceService,
    private fb: FormBuilder,
    private nzNotif: NzNotificationService
  ) {}

  ngOnInit() {
    // Load freelance data from route resolver
    this.freelanceResponse = this.route.snapshot.data["freelanceResponse"];
    this.fillForm(this.freelanceResponse as FreelanceResponse);
  }

  // Fill form with data
  fillForm(freelanceResponse: FreelanceResponse) {
    this.formFreelance = this.fb.group({
      name: [freelanceResponse.name, [Validators.required, Validators.minLength(3)]],
      intitule: [freelanceResponse.intitule, [Validators.required]],
      competences: [freelanceResponse.competences, [Validators.required]],
      email: [freelanceResponse.email, [Validators.required, Validators.email]],
      phone: [freelanceResponse.phone, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    });

    // Set the image URL
    //this.imageUrl = freelanceResponse.photoUrl || '';
  }

  // Handle image import
  importImage() {
    const inpt = document.createElement('input');
    inpt.type = 'file';
    inpt.accept = 'image/*';
    inpt.addEventListener('change', (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        this.imageFile = file;
        this.showImageError = false;
        this.imageUrl = URL.createObjectURL(file);
      }
    });
    inpt.click();
  }

  // Handle update action
  handleUpdateFreelance() {
    if (this.formFreelance.valid) {
      const updatedData = this.formFreelance.value;
      if (this.imageFile) {
        // Add the image file to the data if available
        updatedData.photo = this.imageFile;
      }

      console.log('Updated Freelance Data:', updatedData);

      // Call the update service
      this.freelanceService.updateFreelance(this.id!, updatedData).subscribe({
        next: () => {
          this.nzNotif.success('Success', 'Freelance updated successfully!');
        },
        error: (err) => {
          console.error(err);
          this.nzNotif.error('Error', 'Failed to update freelance.');
        }
      });
    } else {
      this.nzNotif.warning('Warning', 'Please correct the form errors before submitting.');
    }
  }
}
