import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { TooltipItem } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, ChartModule], 
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  alertMessage: string = '';
  lineData: any;
  lineOptions: any;
  pieData: any;
  pieOptions: any;

  constructor() {
    this.lineData = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
      datasets: [
        {
          label: 'Mantención',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#42A5F5',
          tension: 0.1
        },
        {
          label: 'Crecimiento', // Nombre de la segunda línea
          data: [28, 48, 40, 19, 86, 27], // Datos para la segunda línea
          fill: false,
          borderColor: '#FFA726', // Color de la segunda línea
          tension: 0.1 // Suavizado de la línea
        }
      ]
    };

    this.lineOptions = {
      responsive: true,
      plugins: {
        display: true, // Asegúrate de que el título se muestre
        text: 'Análisis de Tendencias', // El texto del título
        font: {
          size: 20, // Tamaño de la fuente del título
          },
        legend: {
          display: true,
          position: 'top' // Posición de la leyenda
        },
        tooltip: {
          callbacks: {
            label: function(context: TooltipItem<'line'>) {
              return `${context.dataset.label}: ${context.raw}`;
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Meses' // Título del eje X
          }
        },
        y: {
          title: {
            display: true,
            text: 'Valores' // Título del eje Y
          }
        }
      }
    };

    // Configuración del gráfico circular
    this.pieData = {
      labels: ['Procesados', 'Pendientes', 'Cancelados'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            "#42A5F5", // Azul para procesados
            "#FFA726", // Naranja para pendientes
            "#FF6384"  // Rojo para cancelados
          ],
          hoverBackgroundColor: [
            "#64B5F6", 
            "#FFB74D", 
            "#FF7399"
          ]
        }
      ]
    };

    this.pieOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    };
  }

  showAlert(message: string) {
    this.alertMessage = message;
    setTimeout(() => {
      this.alertMessage = '';
    }, 3000);
  }
}



