import {Component, Inject, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {LoginRequest} from "../../shared/model/LoginRequest";
import {AuthenticationService} from "../../shared/services/authentication.service";
import {NzInputDirective} from "ng-zorro-antd/input";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    TranslatePipe,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private nzNotif: NzNotificationService,
              private authService: AuthenticationService,
              private router: Router,
              private translateService: TranslateService,
              @Inject(DOCUMENT) private document: Document

  ) {

  }


  ngOnInit() {
    this.initForm()


  }


  public initForm() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    })
  }


  getStatusFor(key:string):boolean{
    return (this.loginForm.get(key)?.errors!=null && this.loginForm.get(key)?.touched) as boolean;
  }
  login() {
    if (this.loginForm.valid) {
      let loginRequest: LoginRequest = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      }

      this.authService.login(loginRequest).subscribe({
        next: (response) => {
          console.log(response);
          localStorage.setItem('access_token', response.token);
          this.translateService.get("notifications").subscribe((data:any ) => {
            this.nzNotif.success(data.informationNotif,data.loginsecces)
          })
          this.router.navigate(['/freelance/list'])
        },
        error: () => {
            this.nzNotif.error($localize`:@@login.service.error:Error`,$localize`:@@login.service.errorLoginMsg:an error occurred while login, be sure that all fields is filled correctly ? please try again`);
        }
      })


    } else {

      this.nzNotif.error("Oops ! ", "All fields are required");
    }
  }



}
