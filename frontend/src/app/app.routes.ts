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
    loadComponent: () => import('./features/admin/admin-layout/admin-layout.component')
      .then(m => m.AdminLayoutComponent),
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
      }
    ]
  }
];
