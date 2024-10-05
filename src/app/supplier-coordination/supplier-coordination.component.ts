import { Component } from '@angular/core';

@Component({
  selector: 'app-supplier-coordination',
  templateUrl: './supplier-coordination.component.html',
  styleUrls: ['./supplier-coordination.component.css']
})
export class SupplierCoordinationComponent {
  outgoingShipments = []; // Inicializa aquí tu lista de envíos salientes

  constructor() {
    // Puedes llenar outgoingShipments aquí o usar un servicio para obtener datos
  }
}


