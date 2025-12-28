import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Product, CreateProductRequest } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/api/categories`);
  }

  getProducts(categoryId?: string): Observable<Product[]> {
    const url = categoryId
      ? `${this.apiUrl}/api/products?categoryId=${categoryId}`
      : `${this.apiUrl}/api/products`;
    return this.http.get<Product[]>(url);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/api/products/${id}`);
  }

  createProduct(request: CreateProductRequest): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/api/products`, request);
  }
}
