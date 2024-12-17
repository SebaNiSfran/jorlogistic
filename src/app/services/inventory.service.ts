import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private supabaseService: SupabaseService) {}

  // Obtener todos los elementos del inventario
  async getInventoryItems(): Promise<any[]> {
    try {
      return await this.supabaseService.getInventoryItems();
    } catch (err) {
      const error = err as Error; // Aseguramos el tipo del error
      console.error('Error al obtener los elementos del inventario:', error.message);
      throw error; 
    }
  }

  // Agregar un elemento al inventario
  async addInventoryItem(item: any): Promise<string> {
    try {
      return await this.supabaseService.addInventoryItem(item);
    } catch (err) {
      const error = err as Error; // Aseguramos el tipo del error
      console.error('Error al agregar el elemento al inventario:', error.message);
      throw error; 
    }
  }
}
