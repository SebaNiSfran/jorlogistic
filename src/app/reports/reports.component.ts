import { Component } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  shippingDelays = []; // Inicializa aquí tu lista de retrasos de envío
  stockIssues = []; // Inicializa aquí tu lista de problemas de stock

  constructor() {
    // Puedes llenar shippingDelays y stockIssues aquí o usar un servicio para obtener datos
  }
}

