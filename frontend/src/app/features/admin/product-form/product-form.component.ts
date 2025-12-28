import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CatalogService } from '../../../core/services/catalog.service';
import { Category, CreateProductRequest } from '../../../core/models';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly catalogService = inject(CatalogService);
  private readonly snackBar = inject(MatSnackBar);

  form: FormGroup;
  categories: Category[] = [];
  loading = false;
  loadingCategories = true;

  constructor() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      brand: [''],
      priceAmount: [null, [Validators.required, Validators.min(0.01)]],
      priceCurrency: ['USD', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      categoryId: ['', Validators.required],
      shortDescription: ['', Validators.maxLength(500)]
    });
  }

  ngOnInit(): void {
    this.catalogService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.loadingCategories = false;
      },
      error: () => {
        this.loadingCategories = false;
        this.snackBar.open('Failed to load categories', 'Close', { duration: 3000 });
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const request: CreateProductRequest = {
      name: this.form.value.name,
      brand: this.form.value.brand || null,
      priceAmount: this.form.value.priceAmount,
      priceCurrency: this.form.value.priceCurrency,
      categoryId: this.form.value.categoryId,
      shortDescription: this.form.value.shortDescription || null
    };

    this.catalogService.createProduct(request).subscribe({
      next: () => {
        this.snackBar.open('Product created successfully', 'Close', { duration: 3000 });
        this.router.navigate(['/admin/products']);
      },
      error: (error) => {
        this.loading = false;
        const message = error.error?.error || 'Failed to create product';
        this.snackBar.open(message, 'Close', { duration: 3000 });
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/products']);
  }
}
