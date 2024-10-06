import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgIf],
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.css'
})
export class RecoverPasswordComponent {
  email: string = '';

  constructor(public router: Router) {}

  onSubmit() {
    if (!this.email) {
      alert('Correo electronico es obligatorio');
      return;
    }
    console.log('email:', this.email);
  }

  onBack() {
    this.router.navigate(['app.component.html']);
  }
}

