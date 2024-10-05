import { Component } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  inventoryItems = []; // Inicializa aquí tu lista de items

  constructor() {
    // Puedes llenar inventoryItems aquí o usar un servicio para obtener datos
  }
}

