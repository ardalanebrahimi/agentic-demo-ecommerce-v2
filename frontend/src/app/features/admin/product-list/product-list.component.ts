import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CatalogService } from '../../../core/services/catalog.service';
import { Product } from '../../../core/models';

@Component({
  selector: 'app-admin-product-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class AdminProductListComponent implements OnInit {
  private readonly catalogService = inject(CatalogService);

  products: Product[] = [];
  loading = true;
  displayedColumns = ['name', 'brand', 'category', 'price'];

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.catalogService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
