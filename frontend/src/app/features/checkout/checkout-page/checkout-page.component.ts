import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CartService } from '../../../core/services/cart.service';
import { OrderService } from '../../../core/services/order.service';
import { CreateOrderRequest, CreateOrderItemRequest } from '../../../core/models';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.scss'
})
export class CheckoutPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly cartService = inject(CartService);
  private readonly orderService = inject(OrderService);
  private readonly snackBar = inject(MatSnackBar);

  currentStep = 1;
  shippingForm: FormGroup;
  shippingMethod = 'Standard';
  loading = false;

  readonly cartItems = this.cartService.cartItems;
  readonly subtotal = this.cartService.subtotal;

  constructor() {
    this.shippingForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.maxLength(100)]],
      address: ['', [Validators.required, Validators.maxLength(500)]],
      city: ['', [Validators.required, Validators.maxLength(100)]],
      state: ['', [Validators.required, Validators.maxLength(50)]],
      zipCode: ['', [Validators.required, Validators.maxLength(20)]],
      phone: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.email, Validators.maxLength(256)]]
    });
  }

  get shippingCost(): number {
    if (this.shippingMethod === 'Express') {
      return 14.99;
    }
    return this.subtotal() >= 100 ? 0 : 9.99;
  }

  get total(): number {
    return this.subtotal() + this.shippingCost;
  }

  get isCartEmpty(): boolean {
    return this.cartItems().length === 0;
  }

  continueToReview(): void {
    if (this.shippingForm.invalid) {
      this.shippingForm.markAllAsTouched();
      return;
    }
    this.currentStep = 2;
  }

  backToShipping(): void {
    this.currentStep = 1;
  }

  placeOrder(): void {
    if (this.isCartEmpty) {
      this.snackBar.open('Your cart is empty', 'Close', { duration: 3000 });
      return;
    }

    this.loading = true;

    const items: CreateOrderItemRequest[] = this.cartItems().map(item => ({
      productId: item.product.id,
      productName: item.product.name,
      unitPrice: item.product.priceAmount,
      currency: item.product.priceCurrency,
      quantity: item.quantity
    }));

    const request: CreateOrderRequest = {
      shippingAddress: {
        firstName: this.shippingForm.value.firstName,
        lastName: this.shippingForm.value.lastName,
        address: this.shippingForm.value.address,
        city: this.shippingForm.value.city,
        state: this.shippingForm.value.state,
        zipCode: this.shippingForm.value.zipCode,
        phone: this.shippingForm.value.phone
      },
      shippingMethod: this.shippingMethod,
      customerEmail: this.shippingForm.value.email || undefined,
      items
    };

    this.orderService.createOrder(request).subscribe({
      next: (order) => {
        this.cartService.clearCart();
        this.router.navigate(['/order', order.id]);
      },
      error: (error) => {
        this.loading = false;
        const message = error.error?.error || 'Failed to create order';
        this.snackBar.open(message, 'Close', { duration: 3000 });
      }
    });
  }
}
