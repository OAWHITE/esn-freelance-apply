import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
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
export class MainLayoutComponent {
  constructor(public router: Router,
              private authService: AuthenticationService,
  ) {}
  logout(): void {
    if (confirm('Are you sure you want to log out?')) {
      this.authService.logout().subscribe({
        next: () => {
          this.authService.clearSession(); // Centralized session clearing
          alert('You have been logged out successfully.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Logout failed:', err);
          alert('Failed to log out. Please try again.');
        },
      });
    }
  }
}
