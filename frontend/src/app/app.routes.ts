import { Routes } from '@angular/router';

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
    path: 'admin',
    loadComponent: () => import('./features/admin/admin-placeholder/admin-placeholder.component')
      .then(m => m.AdminPlaceholderComponent)
  }
];
