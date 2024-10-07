import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Asegúrate de importar esto

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [FormsModule, CommonModule], // Agrega CommonModule aquí
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  showReports: boolean = false; // Controla la visibilidad de los reportes
  reports = [
    { type: 'Retrasos de Envío', description: 'El paquete de cliente A se retrasa.', resolved: false },
    { type: 'Problemas de Stock', description: 'No hay suficiente stock del producto B.', resolved: false },
    { type: 'Retraso en el Pedido', description: 'El pedido del cliente C se ha retrasado.', resolved: false },
    { type: 'Error en la Facturación', description: 'Se ha producido un error en la facturación del cliente D.', resolved: false }
  ];

  constructor(private router: Router) {}

  onBack() {
    this.router.navigate(['/dashboard']);
  }

  viewReportDetails(report: any) {
    alert('Mostrando detalles del reporte: ' + report.description);
  }

  toggleReports() {
    this.showReports = !this.showReports; // Alterna la visibilidad de los reportes
  }
}

