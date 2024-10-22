import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InventoryService } from '../services/inventory.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  filters = {
    stockDate: '',
    article: '',
    stockQuantity: '',
    unitValue: '',
    stockValue: '',
    currency: '',
    lastInventory: '',
    unit: '',
    delays: ''
  };

  showForm = false;

  newItem = {
    stockDate: '',
    article: '',
    stockQuantity: '',
    unitValue: '',
    stockValue: '',
    currency: '',
    lastInventory: '',
    unit: '',
    delays: ''
  };

  inventoryItems: any[] = [];
  filteredItems: any[] = [];

  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
    this.loadInventoryItems();
  }

  loadInventoryItems() {
    this.inventoryService.getInventoryItems().subscribe(
      (items) => {
        this.inventoryItems = items;
        this.filteredItems = [...this.inventoryItems];
        this.clearFilters();
      },
      (error) => {
        console.error('Error loading inventory items:', error);
      }
    );
  }

  filterInventory() {
    this.filteredItems = this.inventoryItems.filter(item => {
      return (!this.filters.stockDate || item.stockDate.includes(this.filters.stockDate))
        && (!this.filters.article || item.article.toLowerCase().includes(this.filters.article.toLowerCase()))
        && (!this.filters.stockQuantity || item.stockQuantity.toString().includes(this.filters.stockQuantity))
        && (!this.filters.unitValue || item.unitValue.toString().includes(this.filters.unitValue))
        && (!this.filters.stockValue || item.stockValue.toString().includes(this.filters.stockValue))
        && (!this.filters.currency || item.currency.toLowerCase().includes(this.filters.currency.toLowerCase()))
        && (!this.filters.lastInventory || item.lastInventory.includes(this.filters.lastInventory))
        && (!this.filters.unit || item.unit.toLowerCase().includes(this.filters.unit.toLowerCase()))
        && (!this.filters.delays || item.delays.toLowerCase().includes(this.filters.delays.toLowerCase()));
    });
    console.log('Elementos filtrados después de aplicar filtros:', this.filteredItems);
  }

  clearFilters() {
    this.filters = {
      stockDate: '',
      article: '',
      stockQuantity: '',
      unitValue: '',
      stockValue: '',
      currency: '',
      lastInventory: '',
      unit: '',
      delays: ''
    };
    this.filteredItems = [...this.inventoryItems];
    console.log('Filtros limpiados, mostrando todos los elementos:', this.filteredItems);
  }

  showAddForm() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.newItem = {
      stockDate: '',
      article: '',
      stockQuantity: '',
      unitValue: '',
      stockValue: '',
      currency: '',
      lastInventory: '',
      unit: '',
      delays: ''
    };
  }

  addInventoryItem() {
    if (!this.newItem.article || !this.newItem.stockDate) {
      console.error('Artículo y fecha de stock son obligatorios');
      return;
    }

     const newItem = {
      stockDate: this.newItem.stockDate,
      article: this.newItem.article,
      stockQuantity: +this.newItem.stockQuantity,
      unitValue: +this.newItem.unitValue,
      stockValue: +this.newItem.stockValue,
      currency: this.newItem.currency,
      lastInventory: this.newItem.lastInventory,
      unit: this.newItem.unit,
      delays: this.newItem.delays
    };

    console.log('Nuevo item a agregar:', newItem);

    this.inventoryService.addInventoryItem(newItem).subscribe(
      (item) => {
        this.inventoryItems.push(item);
        this.filteredItems = [...this.inventoryItems]; // Actualiza filteredItems directamente
        this.applyCurrentFilters(); // Aplica los filtros actuales

        console.log('Inventario actualizado:', this.inventoryItems);
        console.log('Elementos filtrados:', this.filteredItems);

        this.closeForm();
      },
      (error) => {
        console.error('Error adding inventory item:', error);
      }
    );
  }

  applyCurrentFilters() {
    this.filterInventory();
  }
}