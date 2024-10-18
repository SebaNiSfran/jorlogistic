import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-tracking',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css']
})
export class OrderTrackingComponent {
  // Variables para el filtrado
  searchTerm: string = '';
  inventorySearchTerm: string = '';
  fromDate: Date | null = null;
  toDate: Date | null = null;
  selectedStatus: string = '';
  selectedCurrency: string = '';
  selectedUnit: string = '';
  selectedDelays: string = '';

  // Inicializa con arreglos vacíos o datos reales
  orderHistory: any[] = [];  // Tu arreglo de historial de pedidos (inicialmente vacío)
  inventoryData: any[] = []; // Tu arreglo de datos de inventario (inicialmente vacío)
  
  filteredOrderHistory: any[] = []; // Este será el historial de pedidos filtrado
  filteredInventoryData: any[] = []; // Este será el inventario filtrado
  constructor() {
    this.filteredOrderHistory = this.orderHistory; // Inicializa con todos los pedidos
    this.filteredInventoryData = this.inventoryData; // Inicializa con todos los inventarios
  }

  filterOrders() {
    // Lógica de filtrado para pedidos
    this.filteredOrderHistory = this.orderHistory.filter(order => {
      return (
        (this.searchTerm ? order.code.includes(this.searchTerm) : true) &&
        (this.fromDate ? new Date(order.date) >= new Date(this.fromDate) : true) &&
        (this.toDate ? new Date(order.date) <= new Date(this.toDate) : true) &&
        (this.selectedStatus ? order.status === this.selectedStatus : true)
      );
    });
  }

  filterInventory() {
    // Lógica de filtrado para inventario
    this.filteredInventoryData = this.inventoryData.filter(item => {
      return (
        (this.inventorySearchTerm ? item.articulo.includes(this.inventorySearchTerm) : true) &&
        (this.selectedCurrency ? item.moneda === this.selectedCurrency : true) &&
        (this.selectedUnit ? item.unidad === this.selectedUnit : true) &&
        (this.selectedDelays ? item.retrasos === this.selectedDelays : true)
      );
    });
  }
}