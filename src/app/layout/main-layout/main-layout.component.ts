import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {AuthenticationService} from "../../shared/services/authentication.service";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NzDropDownModule, NzIconModule],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainLayoutComponent implements OnInit {
isLoginPage = false;
  constructor(public router: Router,
              private authService: AuthenticationService,
  ) {


  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = this.router.url === '/login';
      }
    })
  }
  logout(){
    this.authService.clearSession()
    this.router.navigate(['/login']);
}

}
