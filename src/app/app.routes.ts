import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryComponent } from './inventory/inventory.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { SupplierCoordinationComponent } from './supplier-coordination/supplier-coordination.component';
import { ReportsComponent } from './reports/reports.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { GestionUsuariosComponent } from './gestion-usuarios/gestion-usuarios.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'order-tracking', component: OrderTrackingComponent },
  { path: 'supplier-coordination', component: SupplierCoordinationComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'recover-password', component: RecoverPasswordComponent },
  { path: 'gestion-usuarios', component: GestionUsuariosComponent },
  { path: '**', redirectTo: '' }
];