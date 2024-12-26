import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { EsnService } from '../../shared/services/esn.service';
import { EsnRequest } from '../../shared/model/EsnRequest';
import {Router} from "@angular/router";

@Component({
  selector: 'app-esn-form',
  standalone: true,
  imports: [NzFormModule,ReactiveFormsModule,NzFormModule, NzSelectModule, NzButtonModule, NzUploadModule],
  templateUrl: './esn-form.component.html',
  styleUrls: ['./esn-form.component.css'],
})
export class EsnFormComponent implements OnInit {
  formEsn!: FormGroup;

  constructor(private esnService: EsnService,
              private fb: FormBuilder,
              private router: Router,
              ) {}

  ngOnInit(): void {
    this.initEsnForm();
  }

  private initEsnForm(): void {
    //this is the controls of form
    this.formEsn = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      contact: [null, [Validators.required, Validators.minLength(3)]],
      poste: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      // image: [null],
    });
  }

  handleAddEsn() {
    if (this.formEsn.valid) {
      const esnRequest: EsnRequest = {
        nameEns: this.formEsn.get("name")?.value,
        nameContact: this.formEsn.get("contact")?.value,
        poste: this.formEsn.get("poste")?.value,
        email: this.formEsn.get("email")?.value,
        phone: this.formEsn.get("phone")?.value
      };
  
      this.esnService.addEsn(esnRequest).subscribe({
        next: () => {
          console.log('you inserted ESN correct')
          this.router.navigate(['/']);
        },
        error: (err) => {
          if (err.status === 409) {
            alert('Ens already exists. Please choose a different Email.');
          } else {
            alert('An error occurred while submitting the form.');
          }
          console.error(err);
        }
      });
    } else {
      console.log('All fields in the form are required.');
      console.log(this.formEsn.errors);
    }
  }
}
