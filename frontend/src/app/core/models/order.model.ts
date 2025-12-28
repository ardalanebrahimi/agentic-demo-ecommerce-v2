import { ShippingAddress } from './shipping-address.model';
import { OrderItem } from './order-item.model';

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  updatedAt: string | null;
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  shippingMethod: string;
  shippingCost: number;
  subtotal: number;
  total: number;
  customerEmail: string | null;
  items: OrderItem[];
}
