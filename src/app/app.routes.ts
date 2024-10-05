import { Routes } from '@angular/router';
import { InventoryComponent } from './inventory/inventory.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { SupplierCoordinationComponent } from './supplier-coordination/supplier-coordination.component';
import { ReportsComponent } from './reports/reports.component';

export const routes: Routes = [
  { path: 'inventory', component: InventoryComponent },
  { path: 'order-tracking', component: OrderTrackingComponent },
  { path: 'supplier-coordination', component: SupplierCoordinationComponent },
  { path: 'reports', component: ReportsComponent },
  { path: '', redirectTo: '/inventory', pathMatch: 'full' },
  { path: '**', redirectTo: '/inventory' }
];

