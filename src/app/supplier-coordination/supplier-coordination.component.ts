import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-supplier-coordination',
  templateUrl: './supplier-coordination.component.html',
  styleUrls: ['./supplier-coordination.component.css']
})
export class SupplierCoordinationComponent {
  searchTerm: string = '';
  suppliers: any[] = JSON.parse(localStorage.getItem('suppliers') || '[]');
  filteredSuppliers: any[] = this.suppliers;

  isEditing: boolean = false;
  editSupplierData: any = null;

  constructor(private router: Router) {} // Inyectar Router

  filterSuppliers() {
    this.filteredSuppliers = this.suppliers.filter(supplier => 
      supplier.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      supplier.dniCif.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      supplier.address.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      supplier.city.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      supplier.phone.includes(this.searchTerm)
    );
  }

  clearSearch() {
    this.searchTerm = '';
    this.filteredSuppliers = this.suppliers;
  }

  addSupplier() {
    const newSupplier = { id: Date.now(), name: '', dniCif: '', address: '', city: '', phone: '' };
    this.suppliers.push(newSupplier);
    this.saveSuppliers();
  }

  editSupplier(supplier: any) {
    this.isEditing = true;
    this.editSupplierData = { ...supplier };
  }

  saveEditSupplier() {
    const index = this.suppliers.findIndex(s => s.id === this.editSupplierData.id);
    if (index !== -1) {
      this.suppliers[index] = this.editSupplierData;
      this.saveSuppliers();
    }
    this.cancelEdit();
  }

  cancelEdit() {
    this.isEditing = false;
    this.editSupplierData = null;
  }

  deleteSupplier(id: number) {
    this.suppliers = this.suppliers.filter(supplier => supplier.id !== id);
    this.saveSuppliers();
    this.filterSuppliers();
  }

  private saveSuppliers() {
    localStorage.setItem('suppliers', JSON.stringify(this.suppliers));
    this.filterSuppliers();
  }

  clearPlaceholder(field: string) {
    if (this.editSupplierData[field]) {
      this.editSupplierData[field] = '';
    }
  }

  goBack() {
    this.router.navigate(['/dashboard']); 
  }
}











