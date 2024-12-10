import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    // Inicializa el cliente de Supabase con las variables de entorno
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  // Método para obtener todos los usuarios
  async getUsers(): Promise<
    {
      rut: string;
      username: string;
      name: string;
      lastname: string;
      password: string; // Asegúrate de incluir esta propiedad
      email: string; // Nueva propiedad para correo electrónico
      age: number | null;
      entryDate: string; // Formato ISO (yyyy-MM-dd)
      department: string | null;
      salary: number | null;
      role: 'Administrador' | 'Trabajador';
    }[]
  > {
    // Realiza la consulta con el alias correctamente aplicado
    const { data, error } = await this.supabase
      .from('users')
      .select(
        `rut, username, name, lastname, password, email, age, entry_date, department, salary, role` // Incluimos 'email' y quitamos 'experience'
      );

    if (error) {
      console.error('Error al obtener usuarios:', error.message);
      throw new Error('No se pudieron obtener los usuarios.');
    }

    // Verificamos que data tenga el formato esperado y no sea null
    if (!data || !Array.isArray(data)) {
      throw new Error('Datos no válidos recibidos de Supabase.');
    }

    // Aseguramos que los datos son objetos y tienen la propiedad 'entryDate'
    return data.map((user: any) => {
      return {
        rut: user.rut,
        username: user.username,
        name: user.name,
        lastname: user.lastname,
        password: user.password,
        email: user.email, // Mapeamos 'email'
        age: user.age,
        entryDate: user.entry_date, // Usamos directamente 'entry_date'
        department: user.department,
        salary: user.salary,
        role: user.role,
      };
    });
  }

  // Método para agregar un usuario
  async addUser(user: {
    rut: string;
    username: string;
    password: string;
    name: string;
    lastname: string;
    email: string; // Nueva propiedad para correo electrónico
    age: number | null;
    entryDate: string;
    department: string | null;
    salary: number | null;
    role: 'Administrador' | 'Trabajador';
  }): Promise<string> {
    const { error } = await this.supabase.from('users').insert([
      {
        rut: user.rut,
        username: user.username,
        password: user.password,
        name: user.name,
        lastname: user.lastname,
        email: user.email, // Agregamos 'email'
        age: user.age,
        entry_date: user.entryDate, // Aseguramos que 'entry_date' esté en el formato correcto
        department: user.department,
        salary: user.salary,
        role: user.role,
      },
    ]);

    if (error) {
      console.error('Error al agregar usuario:', error.message);
      throw new Error('No se pudo agregar el usuario.');
    }

    return 'Usuario agregado con éxito.';
  }
}
