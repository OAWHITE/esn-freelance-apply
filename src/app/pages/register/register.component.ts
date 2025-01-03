import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {UserRequest} from "../../shared/model/UserRequest";
import {RegisterService} from "../../shared/services/register.service";
import {TranslatePipe , TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    TranslatePipe
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  signupForm!: FormGroup;
  errorObject: { key: string, value: boolean }[] = [
    {key: "firstname", value: false},
    {key: "lastname", value: false},
    {key: "email", value: false},
    {key: "password", value: false},
    {key: "confirmPassword", value: false},
  ];

  constructor(private fb: FormBuilder,
              private registerService: RegisterService,
              private router: Router,
              private nzNotif: NzNotificationService,
              private translateService: TranslateService,
  ) {


  }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.signupForm = this.fb.group({
      firstname: [null, [Validators.required, Validators.minLength(3)]],
      lastname: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(8)]],
    });


    this.RegisterErrorListener();
  }

  RegisterErrorListener() {
    Object.keys(this.signupForm.controls).forEach(key => {
      let control = this.signupForm.get(key)

      control?.valueChanges.subscribe((e) => {
        const errorEntry = this.errorObject.find(e => e.key === key);
        if (errorEntry) {
          errorEntry.value = control?.errors != null && control?.touched
        }
      })

    })
  }

  getAllError() {

    Object.keys(this.signupForm.controls).forEach(key => {
      let control = this.signupForm.get(key)
      const errorEntry = this.errorObject.find(e => e.key === key);
      if (errorEntry) {
        errorEntry.value = control?.errors != null;
      }
    })
    // console.log(this.errorObject)
  }

  signup() {
    if (this.signupForm.valid) {
      const userRequest: UserRequest = {
        firstName: this.signupForm.get('firstname')?.value,
        lastName: this.signupForm.get('lastname')?.value,
        password: this.signupForm.get('password')?.value,
        email: this.signupForm.get('email')?.value,
      };
      this.registerService.createUser(userRequest).subscribe({
        next: () => {
          this.translateService.get("notifications").subscribe((data:any ) => {
            this.nzNotif.success(data.informationNotif, data.signUpSucces);

          })
          this.router.navigate(["/"]);
        }, error: (err) => {
          this.translateService.get("notifications").subscribe((data:any ) => {
            this.nzNotif.error(data.errorNotif, data.errorSignUp);

          })        }
      })
    } else {
      this.translateService.get("notifications").subscribe((data:any ) => {
        this.nzNotif.warning(data.warningNotif, data.warningFields);

      })
      this.getAllError()
    }
  }


  controlInputKeyPress(e: any) {
    const pattern = "^[a-zA-Z0-9.@]$"
    const key: string = e.key;
    if (key && !key.match(pattern) && key != "Backspace") {
      e.preventDefault()
    }
  }
}

