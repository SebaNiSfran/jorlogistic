import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent {
  alertMessage: string = ''; // Mensaje de alerta para notificaciones

  // Datos de los artículos del inventario
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

  filteredItems: any[] = [...this.inventoryItems]; 

  constructor() {}


  showAlert(message: string) {
    this.alertMessage = message;
    setTimeout(() => {
      this.alertMessage = '';
    }, 3000); 
  }


 filterInventory() {
  const stockDate = (document.getElementById('stock-date') as HTMLInputElement).value;
  const article = (document.getElementById('article') as HTMLInputElement).value.toLowerCase();
  const stockQuantity = (document.getElementById('stock-quantity') as HTMLInputElement).value;
  const unitValue = (document.getElementById('unit-value') as HTMLInputElement).value;
  const currency = (document.getElementById('currency') as HTMLSelectElement).value;
  const lastInventory = (document.getElementById('last-inventory') as HTMLInputElement).value;
  const unit = (document.getElementById('unit') as HTMLSelectElement).value;
  const delays = (document.getElementById('delays') as HTMLSelectElement).value;

  this.filteredItems = this.inventoryItems.filter(item => {
    const matchesStockDate = stockDate ? item.stockDate === stockDate : true; 
    const matchesArticle = article ? item.article.toLowerCase().includes(article) : true;
    const matchesStockQuantity = stockQuantity ? item.stockQuantity === +stockQuantity : true;
    const matchesUnitValue = unitValue ? item.unitValue === +unitValue : true;
    const matchesCurrency = currency !== 'all' ? item.currency === currency : true;
    const matchesLastInventory = lastInventory ? item.lastInventory === lastInventory : true; 
    const matchesUnit = unit !== 'all' ? item.unit === unit : true;
    const matchesDelays = delays !== 'all' ? item.delays === delays : true;

    return matchesStockDate &&
           matchesArticle && 
           matchesStockQuantity && 
           matchesUnitValue && 
           matchesCurrency && 
           matchesLastInventory && 
           matchesUnit && 
           matchesDelays; 
  });


  if (this.filteredItems.length === 0) {
    this.showAlert('No se encontraron artículos que coincidan con los criterios de filtrado.');
  }
}
}

