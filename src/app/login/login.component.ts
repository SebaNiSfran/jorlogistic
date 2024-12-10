import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';

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
  isLoading: boolean = false;
  error: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  async onSubmit() {
    // Validar que todos los campos estén completos
    if (!this.username || !this.password || !this.role) {
      this.error = 'Todos los campos son obligatorios.';
      return;
    }
  
    this.isLoading = true;
    this.error = '';
  
    try {
      // Llamar al servicio para iniciar sesión
      const user = await this.authService.login(this.username, this.password, this.role);
      console.log('Usuario autenticado');
      //console.log('Usuario autenticado:', user);// verificar datos enviados a la base de datos 
  
      // Verificar que el usuario y el rol existan
      if (!user || !user.role) {
        this.error = 'Error al obtener los datos del usuario.';
        this.isLoading = false;
        return;
      }
  
      // Verificar el rol seleccionado y si coincide con el rol del usuario
      if (user.role.toLowerCase() !== this.role.toLowerCase()) {
        this.error = 'El rol seleccionado no corresponde con sus credenciales.';
        this.isLoading = false;
        return;
      }
  
      // Redirigir según el rol
      if (this.role.toLowerCase() === 'administrador') {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error);
      this.error = error.message || 'Usuario o contraseña incorrectos.';
    } finally {
      this.isLoading = false;
    }
  }

  onRecover() {
    this.router.navigate(['/recover-password']);
  }
}
