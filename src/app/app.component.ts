import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username: string = '';
  password: string = '';
  role: string = '';
  title: any;

  constructor(public router: Router) {}

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
  isLoginPage(): boolean {
    return this.router.url === '/' || this.router.url === '/login';
  }
}


















