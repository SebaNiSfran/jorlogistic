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
    stockdate: '',
    article: '',
    stockquantity: '',
    unitvalue: '',
    stockvalue: '',
    currency: '',
    lastinventory: '',
    unit: '',
    delays: ''
  };

  showForm = false;

  newItem = {
    stockdate: '',
    article: '',
    stockquantity: '',
    unitvalue: '',
    stockvalue: '',
    currency: '',
    lastinventory: '',
    unit: '',
    delays: ''
  };

  inventoryItems: any[] = [];
  filteredItems: any[] = [];

  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
    this.loadInventoryItems();
  }

  async loadInventoryItems() {
    try {
      const items = await this.inventoryService.getInventoryItems();
      this.inventoryItems = items;
      this.filteredItems = [...this.inventoryItems];
    } catch (error) {
      console.error('Error al cargar el inventario:', error);
    }
  }

  filterInventory() {
    this.filteredItems = this.inventoryItems.filter(item => {
      return (!this.filters.stockdate || item.stockdate.includes(this.filters.stockdate))
        && (!this.filters.article || item.article.toLowerCase().includes(this.filters.article.toLowerCase()))
        && (!this.filters.stockquantity || item.stockquantity.toString().includes(this.filters.stockquantity))
        && (!this.filters.unitvalue || item.unitvalue.toString().includes(this.filters.unitvalue))
        && (!this.filters.stockvalue || item.stockvalue.toString().includes(this.filters.stockvalue))
        && (!this.filters.currency || item.currency.toLowerCase().includes(this.filters.currency.toLowerCase()))
        && (!this.filters.lastinventory || item.lastinventory.includes(this.filters.lastinventory))
        && (!this.filters.unit || item.unit.toLowerCase().includes(this.filters.unit.toLowerCase()))
        && (!this.filters.delays || item.delays.toLowerCase().includes(this.filters.delays.toLowerCase()));
    });
  }

  showAddForm() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.resetNewItem();
  }

  resetNewItem() {
    this.newItem = {
      stockdate: '',
      article: '',
      stockquantity: '',
      unitvalue: '',
      stockvalue: '',
      currency: '',
      lastinventory: '',
      unit: '',
      delays: ''
    };
  }

  async addInventoryItem() {
    if (!this.newItem.article || !this.newItem.stockdate) {
      alert('El artículo y la fecha de stock son obligatorios');
      return;
    }

    const newItem = {
      stockdate: this.newItem.stockdate,
      article: this.newItem.article,
      stockquantity: +this.newItem.stockquantity,
      unitvalue: +this.newItem.unitvalue,
      stockvalue: +this.newItem.stockvalue,
      currency: this.newItem.currency,
      lastinventory: this.newItem.lastinventory,
      unit: this.newItem.unit,
      delays: this.newItem.delays
    };

    try {
      const addedItem = await this.inventoryService.addInventoryItem(newItem);
      console.log('Elemento agregado:', addedItem);

      // Actualiza el arreglo local y la tabla
      this.inventoryItems.push(addedItem);
      this.filteredItems = [...this.inventoryItems];
      this.filterInventory(); // Reaplica los filtros si es necesario

      this.closeForm();
    } catch (error) {
      console.error('Error al agregar el elemento al inventario:', error);
    }
  }
}
