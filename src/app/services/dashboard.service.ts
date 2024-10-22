import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, of } from 'rxjs';
import { tap, shareReplay, retry } from 'rxjs/operators';

// Interfaces
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

// Datos de respaldo para desarrollo
const DATOS_MOCK = {
  tendencias: {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    mantencion: [65, 59, 80, 81, 56, 55],
    crecimiento: [28, 48, 40, 19, 86, 27]
  },
  procesos: {
    procesados: 150,
    pendientes: 45,
    cancelados: 25
  }
};

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:3000/api';
  private cacheTendencias = new BehaviorSubject<TrendAnalysisData | null>(null);
  private cacheProcesos = new BehaviorSubject<ProcessStatusData | null>(null);
  private modoDesarrollo = true; // Cambiado a true para usar datos mock

  constructor(private http: HttpClient) { }

  getTrendAnalysis(year: number): Observable<TrendAnalysisData> {
    // Verificar caché
    if (this.cacheTendencias.value) {
      return of(this.cacheTendencias.value);
    }

    // Usar datos mock directamente
    return of(DATOS_MOCK.tendencias).pipe(
      tap(datos => this.cacheTendencias.next(datos)),
      shareReplay(1)
    );
  }

  getProcessStatus(date: string): Observable<ProcessStatusData> {
    // Verificar caché
    if (this.cacheProcesos.value) {
      return of(this.cacheProcesos.value);
    }

    // Usar datos mock directamente
    return of(DATOS_MOCK.procesos).pipe(
      tap(datos => this.cacheProcesos.next(datos)),
      shareReplay(1)
    );
  }

  limpiarCache(): void {
    this.cacheTendencias.next(null);
    this.cacheProcesos.next(null);
  }

  private manejarError<T>(error: HttpErrorResponse, datosMock?: T): Observable<T> {
    console.error('Error en la API:', error);
    
    if (error.status === 0) {
      console.error('Error de conexión:', error.error);
    } else {
      console.error(
        `El servidor respondió con código ${error.status}, ` +
        `mensaje: ${error.error?.message || error.message}`
      );
    }

    // Si estamos en modo desarrollo y tenemos datos mock, los usamos
    if (this.modoDesarrollo && datosMock) {
      console.warn('Usando datos de prueba');
      return of(datosMock);
    }

    // Si no, lanzamos el error
    return throwError(() => new Error('Ha ocurrido un error. Por favor, intente más tarde.'));
  }
}