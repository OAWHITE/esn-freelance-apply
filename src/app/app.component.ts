import { Component,OnInit  } from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import {NgIf} from "@angular/common";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainLayoutComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project';
  constructor(
          private translate: TranslateService,
  ) {
      translate.setDefaultLang('en');
      translate.use('en');
  }
}
