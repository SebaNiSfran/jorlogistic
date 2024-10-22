import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { DashboardService } from '../services/dashboard.service';
import { Subscription } from 'rxjs';

// Interfaces para los datos
interface TrendAnalysisData {
  labels: string[];
  mantencion: number[];
  crecimiento: number[];
}

interface ProcessStatusData {
  procesados: number;
  pendientes: number;
  cancelados: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, ChartModule],
  providers: [DashboardService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  // Variables para el estado del componente
  alertMessage: string = '';
  isLoading: boolean = true;
  hasError: boolean = false;
  private subscriptions: Subscription[] = [];

  // Variables para los gráficos
  lineData: any;
  lineOptions: any;
  pieData: any;
  pieOptions: any;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.cargarDatos();
    this.configurarOpciones();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private cargarDatos(): void {
    // Cargar análisis de tendencias
    this.subscriptions.push(
      this.dashboardService.getTrendAnalysis(new Date().getFullYear()).subscribe({
        next: (data: TrendAnalysisData) => {
          this.lineData = {
            labels: data.labels,
            datasets: [
              {
                label: 'Mantención',
                data: data.mantencion,
                fill: false,
                borderColor: '#42A5F5',
                tension: 0.1
              },
              {
                label: 'Crecimiento',
                data: data.crecimiento,
                fill: false,
                borderColor: '#FFA726',
                tension: 0.1
              }
            ]
          };
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error al cargar análisis de tendencias:', error);
          this.mostrarAlerta('Error al cargar el análisis de tendencias');
          this.hasError = true;
          this.isLoading = false;
        }
      })
    );

    // Cargar estado de procesos
    const fechaHoy = new Date().toISOString().split('T')[0];
    this.subscriptions.push(
      this.dashboardService.getProcessStatus(fechaHoy).subscribe({
        next: (data: ProcessStatusData) => {
          this.pieData = {
            labels: ['Procesados', 'Pendientes', 'Cancelados'],
            datasets: [
              {
                data: [data.procesados, data.pendientes, data.cancelados],
                backgroundColor: ['#42A5F5', '#FFA726', '#FF6384'],
                hoverBackgroundColor: ['#64B5F6', '#FFB74D', '#FF7399']
              }
            ]
          };
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error al cargar estado de procesos:', error);
          this.mostrarAlerta('Error al cargar el estado de los procesos');
          this.hasError = true;
          this.isLoading = false;
        }
      })
    );
  }

  private configurarOpciones(): void {
    // Opciones para el gráfico de líneas
    this.lineOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        }
      }
    };

    // Opciones para el gráfico circular
    this.pieOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      }
    };
  }

  private mostrarAlerta(mensaje: string): void {
    this.alertMessage = mensaje;
    setTimeout(() => {
      this.alertMessage = '';
    }, 3000);
  }
}




