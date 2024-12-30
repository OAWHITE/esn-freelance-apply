import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {LoginRequest} from "../../shared/model/LoginRequest";
import {AuthenticationService} from "../../shared/services/authentication.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private nzNotif: NzNotificationService,
              private authService: AuthenticationService,
              private router: Router
  ) {}

  ngOnInit() {
    this.initForm()
  }


  public initForm() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    })
  }


  login() {
    if (this.loginForm.valid) {
      let loginRequest: LoginRequest = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      }

      this.authService.login(loginRequest).subscribe({
        next: (response) => {
          localStorage.setItem('access_token', response.token);
          this.router.navigate(['/freelance/list'])
        },
        error: () => {
        }
      })


    } else {
      this.nzNotif.error("Oops ! ", "All fields are required");
    }
  }


}
