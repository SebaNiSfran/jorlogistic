import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Asegúrate de importar FormsModule
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';  // Asegúrate de importar tu servicio de autenticación

@Component({
  selector: 'app-recover-password',
  standalone: true, // Asegúrate de que sea standalone
  imports: [CommonModule, FormsModule],  // Aquí debe estar FormsModule
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent {
  email: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  async onSubmit() {
    if (!this.email) {
      this.showAlert('El correo electrónico es obligatorio');
      return;
    }

    const { data, error } = await this.authService.recoverPassword(this.email);
    if (error) {
      this.showAlert(error);
      return;
    }

    // Mostrar alerta con cuadro de texto para ingresar la nueva contraseña
    const { value: newPassword } = await Swal.fire({
      title: 'Ingresa tu nueva contraseña',
      input: 'password',
      inputLabel: 'Nueva contraseña',
      inputPlaceholder: 'Ingresa tu nueva contraseña',
      showCancelButton: true,
      confirmButtonText: 'Actualizar contraseña',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return 'La contraseña no puede estar vacía';
        }
        if (value.length < 6) {
          return 'La contraseña debe tener al menos 6 caracteres';
        }
        return null;
      }
    });

    if (newPassword) {
      const { data: updateData, error: updateError } = await this.authService.updatePassword(this.email, newPassword);
      if (updateError) {
        this.showAlert(updateError);
      } else {
        this.showConfirmation();
      }
    }
  }

  showAlert(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      confirmButtonText: 'Aceptar',
    });
  }

  showConfirmation() {
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'La contraseña ha sido actualizada correctamente.',
      confirmButtonText: 'Aceptar',
    });
  }

  onBack() {
    this.router.navigate(['/login']);
  }
}
