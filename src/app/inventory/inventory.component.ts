import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
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

  inventoryItems = [
    {
      article: 'iPhone 15 Pro MAX',
      stockDate: '2024-10-01',
      stockQuantity: 10,
      unitValue: 1450.00,
      stockValue: 14500.00,
      currency: 'Dólar',
      lastInventory: '2024-09-15',
      unit: 'Procede',
      delays: 'Sí',
    },
    {
      article: 'iPhone 12',
      stockDate: '2024-10-02',
      stockQuantity: 20,
      unitValue: 850,
      stockValue: 17000,
      currency: 'Dólar',
      lastInventory: '2024-09-16',
      unit: 'No procede',
      delays: 'No',
    },
    {
      article: 'MacBook Pro 16"',
      stockDate: '2024-10-03',
      stockQuantity: 15,
      unitValue: 2500.00,
      stockValue: 37500.00,
      currency: 'Dólar',
      lastInventory: '2024-09-17',
      unit: 'Procede',
      delays: 'Sí',
    },
    {
      article: 'Asus ROG Zephyrus G14',
      stockDate: '2024-10-04',
      stockQuantity: 5,
      unitValue: 2200.00,
      stockValue: 11000.00,
      currency: 'Euro',
      lastInventory: '2024-09-18',
      unit: 'No procede',
      delays: 'No',
    },
    {
      article: 'Nike Air Max 270',
      stockDate: '2024-10-05',
      stockQuantity: 30,
      unitValue: 150.00,
      stockValue: 4500.00,
      currency: 'Dólar',
      lastInventory: '2024-09-19',
      unit: 'Procede',
      delays: 'Sí',
    },
    {
      article: 'Adidas Ultraboost',
      stockDate: '2024-10-06',
      stockQuantity: 25,
      unitValue: 130.00,
      stockValue: 3250.00,
      currency: 'Euro',
      lastInventory: '2024-09-20',
      unit: 'No procede',
      delays: 'No',
    },
    {
      article: 'Smart TV Samsung 55"',
      stockDate: '2024-10-07',
      stockQuantity: 12,
      unitValue: 800000,
      stockValue: 9600000,
      currency: 'Peso',
      lastInventory: '2024-09-21',
      unit: 'Procede',
      delays: 'No',
    },
    {
      article: 'Lavadora LG 12kg',
      stockDate: '2024-10-08',
      stockQuantity: 8,
      unitValue: 500000,
      stockValue: 4000000,
      currency: 'Peso',
      lastInventory: '2024-09-22',
      unit: 'Procede',
      delays: 'Sí',
    },
    {
      article: 'Consola PS5',
      stockDate: '2024-10-09',
      stockQuantity: 18,
      unitValue: 600.00,
      stockValue: 10800.00,
      currency: 'Dólar',
      lastInventory: '2024-09-23',
      unit: 'No procede',
      delays: 'No',
    },
    {
      article: 'Cafetera Nespresso',
      stockDate: '2024-10-10',
      stockQuantity: 10,
      unitValue: 100000,
      stockValue: 1000000,
      currency: 'Peso',
      lastInventory: '2024-09-24',
      unit: 'Procede',
      delays: 'No',
    },
  ];

  filteredItems = [...this.inventoryItems];

  filterInventory() {
    this.filteredItems = this.inventoryItems.filter(item => {
      return (!this.filters.stockDate || item.stockDate === this.filters.stockDate)
        && (!this.filters.article || item.article.toLowerCase().includes(this.filters.article.toLowerCase()))
        && (!this.filters.stockQuantity || item.stockQuantity === +this.filters.stockQuantity)
        && (!this.filters.unitValue || item.unitValue === +this.filters.unitValue)
        && (!this.filters.stockValue || item.stockValue === +this.filters.stockValue)
        && (!this.filters.currency || item.currency === this.filters.currency)
        && (!this.filters.lastInventory || item.lastInventory === this.filters.lastInventory)
        && (!this.filters.unit || item.unit === this.filters.unit)
        && (!this.filters.delays || item.delays === this.filters.delays);
    });
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
    this.inventoryItems.push({
      stockDate: this.newItem.stockDate,
      article: this.newItem.article,
      stockQuantity: +this.newItem.stockQuantity, 
      unitValue: +this.newItem.unitValue, 
      stockValue: +this.newItem.stockValue,
      currency: this.newItem.currency,
      lastInventory: this.newItem.lastInventory,
      unit: this.newItem.unit,
      delays: this.newItem.delays
    });
    this.filteredItems = [...this.inventoryItems]; 
    this.closeForm(); 
  }
}
