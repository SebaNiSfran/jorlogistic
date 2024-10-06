import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent {
  email: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (!this.email) {
      this.showAlert('El correo electrónico es obligatorio');
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.showAlert('Por favor, ingresa un correo electrónico válido');
      return;
    }

   
    console.log('Se enviaron instrucciones a:', this.email);
    this.showConfirmation(); 
  }

  isValidEmail(email: string): boolean {
    return email.includes('@');
  }

  showAlert(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      confirmButtonText: 'Aceptar',
      customClass: {
        popup: 'my-popup', 
      },
      backdrop: true, 
      allowOutsideClick: false, 
    });
  }

  showConfirmation() {
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Se ha enviado un correo con instrucciones para recuperar su contraseña.',
      confirmButtonText: 'Aceptar',
      customClass: {
        popup: 'my-popup',
      },
      backdrop: true,
      allowOutsideClick: false,
    });
  }

  onBack() {
    this.router.navigate(['/login']); 
  }
}




