import { Routes } from '@angular/router';
import { InventoryComponent } from './inventory/inventory.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { SupplierCoordinationComponent } from './supplier-coordination/supplier-coordination.component';
import { ReportsComponent } from './reports/reports.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', redirectTo: '', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'order-tracking', component: OrderTrackingComponent },
  { path: 'supplier-coordination', component: SupplierCoordinationComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'recover-password', component: RecoverPasswordComponent},
  { path: '**', redirectTo: '/login' }
];





