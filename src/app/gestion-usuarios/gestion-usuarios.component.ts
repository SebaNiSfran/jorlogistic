import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../services/supabase.service';


// Definimos el tipo para el usuario
interface User {
  rut: string;
  username: string;
  name: string;
  lastname: string;
  password: string;  // Mantener la propiedad password
  age: number | null;
  entryDate: string;
  department: string | null;
  salary: number | null;
  experience: number | null;
  role: 'Administrador' | 'Trabajador';
}

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit {
  filters = {
    rut: '',
    username: '',
    name: '',
    lastname: '',
    age: '',
    entryDate: '',
    department: '',
    salary: '',
    experience: '',
    role: ''
  };

  showForm = false;

  newUser = {
    rut: '',
    username: '',
    password: '',
    name: '',
    lastname: '',
    age: null as number | null,
    entryDate: '',
    department: '',
    salary: null as number | null,
    experience: null as number | null,
    role: '' as 'Administrador' | 'Trabajador'
  };

  users: User[] = []; // Usamos el tipo User para los usuarios
  filteredUsers: User[] = []; // También actualizamos el tipo para filteredUsers

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit() {
    this.loadUsers();
  }


// Método para cargar los usuarios desde la base de datos
async loadUsers() {
  try {
    const users = await this.supabaseService.getUsers();
    // Aquí estamos añadiendo la propiedad password a cada usuario si no la tiene
    this.users = users.map(user => ({
      ...user,
      password: user.password || '' // Asignamos un valor vacío si no tiene la propiedad password
    }));
    this.filteredUsers = [...this.users];
  } catch (error) {
    console.error('Error al cargar los usuarios:', error);
  }
}


  // Método para filtrar los usuarios según los filtros aplicados
  filterUsers() {
    this.filteredUsers = this.users.filter(user => {
      return (!this.filters.rut || user.rut.toLowerCase().includes(this.filters.rut.toLowerCase()))
        && (!this.filters.username || user.username.toLowerCase().includes(this.filters.username.toLowerCase()))
        && (!this.filters.name || user.name.toLowerCase().includes(this.filters.name.toLowerCase()))
        && (!this.filters.lastname || user.lastname.toLowerCase().includes(this.filters.lastname.toLowerCase()))
        && (!this.filters.age || user.age === +this.filters.age)
        && (!this.filters.entryDate || new Date(user.entryDate).toISOString().split('T')[0] === this.filters.entryDate)
        && (!this.filters.department || user.department === this.filters.department)
        && (!this.filters.salary || user.salary === parseFloat(this.filters.salary))
        && (!this.filters.experience || user.experience === +this.filters.experience)
        && (!this.filters.role || user.role.toLowerCase() === this.filters.role.toLowerCase());
    });
  }

  // Método para mostrar el formulario de agregar usuario
  showAddForm() {
    this.showForm = true;
  }

  // Método para cerrar el formulario de agregar usuario
  closeForm() {
    this.showForm = false;
    this.newUser = {
      rut: '',
      username: '',
      password: '',
      name: '',
      lastname: '',
      age: null,
      entryDate: '',
      department: '',
      salary: null,
      experience: null,
      role: '' as 'Administrador' | 'Trabajador'
    };
  }

  // Método para agregar un nuevo usuario
  async addUser() {
    if (!this.newUser.rut || !this.newUser.username || !this.newUser.password || !this.newUser.name || !this.newUser.lastname || this.newUser.age === null || !this.newUser.entryDate || !this.newUser.department || !this.newUser.role) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }

    const newUser = {
      rut: this.newUser.rut,
      username: this.newUser.username,
      password: this.newUser.password,
      name: this.newUser.name,
      lastname: this.newUser.lastname,
      age: this.newUser.age,
      entryDate: new Date(this.newUser.entryDate).toISOString().split('T')[0],
      department: this.newUser.department,
      salary: this.newUser.salary ? parseFloat(this.newUser.salary.toString()) : null,
      experience: this.newUser.experience,
      role: this.newUser.role
    };

    try {
      const message = await this.supabaseService.addUser(newUser);
      console.log(message);
      // Mantener la contraseña en el objeto cuando se muestra en la tabla
      this.users.push(newUser);
      this.filteredUsers = [...this.users]; // Actualiza la tabla con el nuevo usuario
      this.closeForm();
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
    }
  }
}
