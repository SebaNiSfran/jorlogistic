import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent {
  filters = {
    rut: '',
    name: '',
    lastname: '',
    age: '',
    entryDate: '',
    department: '',
    salary: '',
    experience: ''
  };

  showForm = false;

  newUser = {
    rut: '',
    name: '',
    lastname: '',
    age: undefined,
    entryDate: '',
    department: '',
    salary: undefined,
    experience: undefined
  };

  users = [
    {
      rut: '12345678-9',
      name: 'Juan',
      lastname: 'Pérez',
      age: 30,
      entryDate: new Date('2020-01-15'),
      department: 'Ventas',
      salary: 1500.00,
      experience: 5
    },
    {
      rut: '98765432-1',
      name: 'María',
      lastname: 'López',
      age: 28,
      entryDate: new Date('2019-03-20'),
      department: 'Marketing',
      salary: 1200.00,
      experience: 3
    },
    
  ];

  filteredUsers = [...this.users];

  filterUsers() {
    this.filteredUsers = this.users.filter(user => {
      return (!this.filters.rut || user.rut.toLowerCase().includes(this.filters.rut.toLowerCase()))
        && (!this.filters.name || user.name.toLowerCase().includes(this.filters.name.toLowerCase()))
        && (!this.filters.lastname || user.lastname.toLowerCase().includes(this.filters.lastname.toLowerCase()))
        && (!this.filters.age || user.age === +this.filters.age)
        && (!this.filters.entryDate || user.entryDate.toLocaleDateString() === new Date(this.filters.entryDate).toLocaleDateString())
        && (!this.filters.department || user.department === this.filters.department)
        && (!this.filters.salary || user.salary === +this.filters.salary)
        && (!this.filters.experience || user.experience === +this.filters.experience);
    });
  }

  showAddForm() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    
    this.newUser = { 
      rut: '',
      name: '',
      lastname: '',
      age: undefined,
      entryDate: '',
      department: '',
      salary: undefined,
      experience: undefined
    };
  }

  addUser() {
   
    if (!this.newUser.rut || !this.newUser.name || !this.newUser.lastname || this.newUser.age === undefined || !this.newUser.entryDate || !this.newUser.department) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }

    
    this.users.push({
      rut: this.newUser.rut,
      name: this.newUser.name,
      lastname: this.newUser.lastname,
      age: this.newUser.age !== undefined ? this.newUser.age : 0,
      entryDate: new Date(this.newUser.entryDate),
      department: this.newUser.department,
      salary: this.newUser.salary !== undefined ? this.newUser.salary : 0,
      experience: this.newUser.experience !== undefined ? this.newUser.experience : 0
    });

    
    this.filterUsers(); 
    this.closeForm(); 
  }


  manageUsers() {
    this.filterUsers(); 
  }
}
