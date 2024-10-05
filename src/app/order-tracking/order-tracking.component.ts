import { Component } from '@angular/core';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css']
})
export class OrderTrackingComponent {
  activeShipments = []; // Inicializa aquí tu lista de envíos activos
  orderHistory = []; // Inicializa aquí tu historial de pedidos

  constructor() {
    // Puedes llenar activeShipments y orderHistory aquí o usar un servicio para obtener datos
  }
}

