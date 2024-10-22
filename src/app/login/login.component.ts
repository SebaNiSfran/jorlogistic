import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  role: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (!this.username || !this.password || !this.role) {
      alert('Todos los campos son obligatorios.');
      return;
    }
    console.log('Usuario:', this.username);
    console.log('Contraseña:', this.password);
    console.log('Rol:', this.role);
    this.router.navigate(['/dashboard']);
  }

  onRecover() {
    this.router.navigate(['/recover-password']);
  }
}
