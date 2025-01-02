import { Component,OnInit  } from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainLayoutComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project';

}
