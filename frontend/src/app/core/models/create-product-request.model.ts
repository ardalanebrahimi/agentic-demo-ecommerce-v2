export interface CreateProductRequest {
  name: string;
  brand: string | null;
  priceAmount: number;
  priceCurrency: string;
  categoryId: string;
  shortDescription: string | null;
}
