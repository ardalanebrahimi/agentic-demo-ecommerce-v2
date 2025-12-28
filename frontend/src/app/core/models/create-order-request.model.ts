import { ShippingAddress } from './shipping-address.model';

export interface CreateOrderItemRequest {
  productId: string;
  productName: string;
  unitPrice: number;
  currency: string;
  quantity: number;
}

export interface CreateOrderRequest {
  shippingAddress: ShippingAddress;
  shippingMethod: string;
  customerEmail?: string;
  items: CreateOrderItemRequest[];
}
