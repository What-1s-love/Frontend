import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { AuthService } from '../shared/services/auth';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

 
  email = '';
  password = '';

  onSubmit() {
    const user = { email: this.email, password: this.password };
    
    this.authService.login(user).subscribe({
      next: () => {
      },
      error: (err) => {
        this.password = '';
      }
    });
  }
}