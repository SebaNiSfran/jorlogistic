import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-root',
  standalone: true, // Marca el componente como standalone
  imports: [CommonModule, FormsModule], // Agrega los módulos aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Puedes agregar tu archivo CSS aquí
})
export class AppComponent {
  username: string = '';
  password: string = '';
  role: string = '';

  onSubmit() {
    console.log('Usuario:', this.username);
    console.log('Contraseña:', this.password);
    console.log('Rol:', this.role);
  }
}




