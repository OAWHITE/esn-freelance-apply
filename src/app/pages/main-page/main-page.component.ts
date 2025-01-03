import {Component, OnInit} from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import {TranslatePipe, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {





}
