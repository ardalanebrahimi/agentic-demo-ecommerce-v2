import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { OrderService } from '../../../../core/services/order.service';
import { Order } from '../../../../core/models';

@Component({
  selector: 'app-admin-order-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss'
})
export class AdminOrderDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly orderService = inject(OrderService);
  private readonly snackBar = inject(MatSnackBar);

  order = signal<Order | null>(null);
  loading = signal(true);
  updating = signal(false);
  error = signal<string | null>(null);

  readonly statusOptions = [
    { value: 'Pending', label: 'Pending', icon: 'schedule' },
    { value: 'Processing', label: 'Processing', icon: 'autorenew' },
    { value: 'Shipped', label: 'Shipped', icon: 'local_shipping' },
    { value: 'Delivered', label: 'Delivered', icon: 'check_circle' },
    { value: 'Cancelled', label: 'Cancelled', icon: 'cancel' }
  ];

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.loadOrder(orderId);
    } else {
      this.error.set('Order ID not found');
      this.loading.set(false);
    }
  }

  private loadOrder(id: string): void {
    this.orderService.getOrder(id).subscribe({
      next: (order) => {
        this.order.set(order);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.error?.error || 'Failed to load order');
        this.loading.set(false);
      }
    });
  }

  updateStatus(newStatus: string): void {
    const currentOrder = this.order();
    if (!currentOrder || currentOrder.status === newStatus) return;

    this.updating.set(true);

    this.orderService.updateOrderStatus(currentOrder.id, newStatus).subscribe({
      next: (updatedOrder) => {
        this.order.set(updatedOrder);
        this.updating.set(false);
        this.snackBar.open(`Order status updated to ${newStatus}`, 'Close', { duration: 3000 });
      },
      error: (err) => {
        this.updating.set(false);
        this.snackBar.open(err.error?.error || 'Failed to update status', 'Close', { duration: 3000 });
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending': return 'status-pending';
      case 'processing': return 'status-processing';
      case 'shipped': return 'status-shipped';
      case 'delivered': return 'status-delivered';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  }

  canTransitionTo(newStatus: string): boolean {
    const currentOrder = this.order();
    if (!currentOrder) return false;

    const currentStatus = currentOrder.status;

    // Define valid transitions
    const validTransitions: Record<string, string[]> = {
      'Pending': ['Processing', 'Cancelled'],
      'Processing': ['Shipped', 'Cancelled'],
      'Shipped': ['Delivered'],
      'Delivered': [],
      'Cancelled': []
    };

    return validTransitions[currentStatus]?.includes(newStatus) ?? false;
  }
}
