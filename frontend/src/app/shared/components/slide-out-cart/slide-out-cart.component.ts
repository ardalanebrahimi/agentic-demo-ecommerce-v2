import { Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-slide-out-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule],
  templateUrl: './slide-out-cart.component.html',
  styleUrl: './slide-out-cart.component.scss'
})
export class SlideOutCartComponent {
  readonly cartService = inject(CartService);

  open = input<boolean>(false);
  closed = output<void>();

  close(): void {
    this.closed.emit();
  }

  updateQuantity(productId: string, delta: number): void {
    const item = this.cartService.cartItems().find(i => i.product.id === productId);
    if (item) {
      this.cartService.updateQuantity(productId, item.quantity + delta);
    }
  }

  removeItem(productId: string): void {
    this.cartService.removeFromCart(productId);
  }
}
