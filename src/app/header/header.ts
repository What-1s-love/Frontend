import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Потрібен для *ngIf та async
import { RouterModule } from '@angular/router'; // Потрібен для routerLink
import { AuthService } from '../shared/services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  // Підключаємо наш сервіс авторизації
  public authService = inject(AuthService);
  appTitle = 'Новини IT';

  logout() {
    this.authService.logout();
  }
}