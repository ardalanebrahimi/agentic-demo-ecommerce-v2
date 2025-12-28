import { Injectable, signal, computed } from '@angular/core';
import { Product, CartItem, Cart } from '../models';

const CART_STORAGE_KEY = 'ecommerce_cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly items = signal<CartItem[]>(this.loadFromStorage());

  readonly cart = computed<Cart>(() => {
    const items = this.items();
    const subtotal = items.reduce((sum, item) => sum + (item.product.priceAmount * item.quantity), 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    return { items, subtotal, itemCount };
  });

  readonly itemCount = computed(() => this.cart().itemCount);
  readonly subtotal = computed(() => this.cart().subtotal);
  readonly cartItems = computed(() => this.cart().items);

  addToCart(product: Product, quantity: number = 1): void {
    const currentItems = this.items();
    const existingIndex = currentItems.findIndex(item => item.product.id === product.id);

    if (existingIndex >= 0) {
      const updatedItems = [...currentItems];
      updatedItems[existingIndex] = {
        ...updatedItems[existingIndex],
        quantity: updatedItems[existingIndex].quantity + quantity
      };
      this.items.set(updatedItems);
    } else {
      this.items.set([...currentItems, { product, quantity }]);
    }

    this.saveToStorage();
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const currentItems = this.items();
    const updatedItems = currentItems.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    this.items.set(updatedItems);
    this.saveToStorage();
  }

  removeFromCart(productId: string): void {
    const currentItems = this.items();
    this.items.set(currentItems.filter(item => item.product.id !== productId));
    this.saveToStorage();
  }

  clearCart(): void {
    this.items.set([]);
    this.saveToStorage();
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.items()));
    } catch {
      // localStorage not available
    }
  }

  private loadFromStorage(): CartItem[] {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }
}
