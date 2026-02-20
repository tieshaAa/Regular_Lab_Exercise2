import { Injectable, signal } from '@angular/core';

export interface CartItem {
  name: string;
  price: number;
  image: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class Cart {
  cartItems = signal<CartItem[]>([]);
  
  addToCart(product: { name: string; price: number; image: string }) {
    const currentItems = this.cartItems();
    const existingItem = currentItems.find(item => item.name === product.name);
    
    if (existingItem) {
      // Increase quantity if item already exists
      this.cartItems.update(items =>
        items.map(item =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Add new item to cart
      this.cartItems.update(items => [
        ...items,
        { ...product, quantity: 1 }
      ]);
    }
  }
  
  removeFromCart(productName: string) {
    this.cartItems.update(items =>
      items.filter(item => item.name !== productName)
    );
  }
  
  updateQuantity(productName: string, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productName);
      return;
    }
    
    this.cartItems.update(items =>
      items.map(item =>
        item.name === productName
          ? { ...item, quantity }
          : item
      )
    );
  }
  
  getTotalPrice(): number {
    return this.cartItems().reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
  
  getTotalItems(): number {
    return this.cartItems().reduce(
      (total, item) => total + item.quantity,
      0
    );
  }
  
  clearCart() {
    this.cartItems.set([]);
  }
}
