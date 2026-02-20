import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Products } from './products/products';
import { Cart as CartService } from './services/cart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Products, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Tiesha\'s Hair Accessories');
  cartService = inject(CartService);
  showCart = signal(false);
  showCheckoutModal = signal(false);
  showSuccessModal = signal(false);
  lastOrderTotal = signal(0);
  
  get cartItemCount() {
    return this.cartService.getTotalItems();
  }
  
  get cartItems() {
    return this.cartService.cartItems();
  }
  
  get totalPrice() {
    return this.cartService.getTotalPrice();
  }
  
  toggleCart() {
    this.showCart.update(value => !value);
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
  
  checkout() {
    const items = this.cartItems;
    
    if (items.length === 0) {
      alert('Your cart is empty. Please add items before checkout.');
      return;
    }
    
    // Show checkout modal
    this.showCheckoutModal.set(true);
  }
  
  confirmCheckout() {
    const total = this.totalPrice;
    
    // Store total before clearing cart
    this.lastOrderTotal.set(total);
    
    // Close checkout modal
    this.showCheckoutModal.set(false);
    
    // Clear cart and close dropdown
    this.cartService.clearCart();
    this.showCart.set(false);
    
    // Show success modal
    this.showSuccessModal.set(true);
  }
  
  cancelCheckout() {
    this.showCheckoutModal.set(false);
  }
  
  closeSuccessModal() {
    this.showSuccessModal.set(false);
  }
}
