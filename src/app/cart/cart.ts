import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cart as CartService } from '../services/cart';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  cartService = inject(CartService);
  
  get cartItems() {
    return this.cartService.cartItems();
  }
  
  get totalPrice() {
    return this.cartService.getTotalPrice();
  }
  
  get totalItems() {
    return this.cartService.getTotalItems();
  }
  
  removeItem(productName: string) {
    this.cartService.removeFromCart(productName);
  }
  
  updateQuantity(productName: string, quantity: number) {
    this.cartService.updateQuantity(productName, quantity);
  }
  
  clearCart() {
    this.cartService.clearCart();
  }
}
