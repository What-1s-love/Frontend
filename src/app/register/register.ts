import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../shared/services/auth';
import { ToastrService } from 'ngx-toastr';

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
  private toastr = inject(ToastrService);

  email = '';
  password = '';
  confirmPassword = '';

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.toastr.error('Паролі не співпадають!', 'Помилка валідації');
      return;
    }

    const user = { email: this.email, password: this.password };

    this.authService.register(user).subscribe({
      next: () => {
        this.toastr.success('Реєстрація успішна!', 'Вітаємо'); 
        this.router.navigate(['/login']);
      },
      error: (err) => {
      }
    });
  }
}