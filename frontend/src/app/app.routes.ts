import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'shop',
    pathMatch: 'full'
  },
  {
    path: 'shop',
    loadComponent: () => import('./features/shop/product-list/product-list.component')
      .then(m => m.ProductListComponent)
  },
  {
    path: 'shop/:id',
    loadComponent: () => import('./features/shop/product-detail/product-detail.component')
      .then(m => m.ProductDetailComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart-page/cart-page.component')
      .then(m => m.CartPageComponent)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./features/checkout/checkout-page/checkout-page.component')
      .then(m => m.CheckoutPageComponent)
  },
  {
    path: 'order/:id',
    loadComponent: () => import('./features/orders/order-confirmation/order-confirmation.component')
      .then(m => m.OrderConfirmationComponent)
  },
  {
    path: 'admin/login',
    loadComponent: () => import('./features/admin/login/admin-login.component')
      .then(m => m.AdminLoginComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/admin-layout/admin-layout.component')
      .then(m => m.AdminLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
      },
      {
        path: 'products',
        loadComponent: () => import('./features/admin/product-list/product-list.component')
          .then(m => m.AdminProductListComponent)
      },
      {
        path: 'products/new',
        loadComponent: () => import('./features/admin/product-form/product-form.component')
          .then(m => m.ProductFormComponent)
      },
      {
        path: 'orders',
        loadComponent: () => import('./features/admin/orders/order-list/order-list.component')
          .then(m => m.AdminOrderListComponent)
      },
      {
        path: 'orders/:id',
        loadComponent: () => import('./features/admin/orders/order-detail/order-detail.component')
          .then(m => m.AdminOrderDetailComponent)
      }
    ]
  }
];
