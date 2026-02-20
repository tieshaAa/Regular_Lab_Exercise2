import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cart } from '../services/cart';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  cartService = inject(Cart);
  
  products = [
    { name: 'Floral Hair Vine', price: 24.99, available: true, image: '/Images/Floral%20Hair%20Vine.jpg' },
    { name: 'Ribbon Scrunchie', price: 12.99, available: true, image: '/Images/Ribbon%20Scrunchie.jpg' },
    { name: 'Pearl Hair Clips', price: 18.99, available: false, image: '/Images/Pearl%20Hair%20Clips.jpg' },
    { name: 'Hair Clip Set', price: 15.99, available: true, image: '/Images/Hair%20Clip%20Set.jpg' },
    { name: 'Elegant Headband', price: 22.99, available: true, image: '/Images/Elegant%20Headband.jpg' },
    { name: 'Bridal Hairpiece', price: 34.99, available: false, image: '/Images/Bridal%20Hairpiece.jpg' }
  ];

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}
