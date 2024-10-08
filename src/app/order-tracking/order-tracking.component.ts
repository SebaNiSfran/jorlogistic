import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-tracking',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css']
})
export class OrderTrackingComponent {
  // Historial de pedidos
  orderHistory = [
    { id: 1, date: '2024-10-01', code: 'ORD123', customer: 'Cliente A', amount: 1000, status: 'Cerrado' },
    { id: 2, date: '2024-10-02', code: 'ORD124', customer: 'Cliente B', amount: 1500, status: 'Abierto' },
    { id: 3, date: '2024-10-03', code: 'ORD125', customer: 'Cliente C', amount: 2000, status: 'Cerrado' },
  ];

  // Variables para los filtros
  searchTerm: string = '';
  fromDate: string = '';
  toDate: string = '';
  selectedStatus: string = '';

  // Historial filtrado
  filteredOrderHistory = this.orderHistory;

  constructor() {}

  // Método para aplicar los filtros
  filterOrders() {
    this.filteredOrderHistory = this.orderHistory.filter(order => {
      const matchesCode = order.code.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.selectedStatus ? order.status === this.selectedStatus : true;
      const matchesFromDate = this.fromDate ? new Date(order.date) >= new Date(this.fromDate) : true;
      const matchesToDate = this.toDate ? new Date(order.date) <= new Date(this.toDate) : true;

      return matchesCode && matchesStatus && matchesFromDate && matchesToDate;
    });
  }
}


