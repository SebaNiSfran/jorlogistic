import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { SupabaseService } from './supabase.service'; // Importar el servicio SupabaseService

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase: SupabaseClient;
  private userSubject = new BehaviorSubject<any>(null);

  constructor(private supabaseService: SupabaseService) { // Inyectar el servicio SupabaseService
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

    // Verifica si hay un usuario autenticado al iniciar la aplicación
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.userSubject.next(JSON.parse(savedUser));
    }
  }

  // Método para la recuperación de contraseña
  async recoverPassword(email: string) {
    // Primero, verificamos si el usuario existe
    const { data, error: getUserError } = await this.supabase
      .from('users')  // Suponiendo que la tabla se llama 'users'
      .select('*')
      .eq('email', email)
      .single();

    if (getUserError || !data) {
      return { error: 'No se encontró un usuario con ese correo electrónico.' };
    }

    // Si el usuario existe, podemos proceder con la actualización de la contraseña
    return { data: 'Usuario encontrado, puede ingresar una nueva contraseña.' };
  }

  // Método para actualizar la contraseña
  async updatePassword(email: string, newPassword: string) {
    // Actualizamos la contraseña directamente en la base de datos
    const { data, error } = await this.supabase
      .from('users')  // Suponiendo que la tabla se llama 'users'
      .update({ password: newPassword })  // Asumiendo que el campo de contraseña es 'password'
      .eq('email', email);

    if (error) {
      return { error: 'Error al actualizar la contraseña.' };
    }

    return { data: 'Contraseña actualizada correctamente.' };
  }

  async login(username: string, password: string, role: string) {
    //ver que datos estan pasando a la consulta 
    //console.log('Username:', username);
    //console.log('Password:', password);
    //console.log('Role:', role);
  

    // Obtener todos los usuarios
    const users = await this.supabaseService.getUsers();

    // Buscar el usuario con el username y password proporcionados
    const user = users.find((u: { username: string; password: string; role: string }) => 
      u.username === username && u.password === password && u.role === role
    );

    if (!user) {
      throw new Error('Usuario o contraseña incorrectos.');
    }

    // Guardar el usuario en el localStorage y actualizar el BehaviorSubject
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);

    return user; 
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.userSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.userSubject.value;
  }

  getCurrentUser() {
    return this.userSubject.value;
  }
}
