import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';


@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLink],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

  constructor(public router: Router) {
  }
}
