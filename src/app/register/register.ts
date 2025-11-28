import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../shared/services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);

  email = '';
  password = '';
  confirmPassword = '';

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('Паролі не співпадають!');
      return;
    }

    this.authService.register({ email: this.email, password: this.password })
      .subscribe({
        next: () => {
          alert('Успішна реєстрація!');
          this.router.navigate(['/login']);
        },
        error: () => alert('Помилка! Можливо, такий користувач вже є.')
      });
  }
}