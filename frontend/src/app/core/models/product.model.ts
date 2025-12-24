export interface Product {
  id: string;
  name: string;
  brand: string | null;
  priceAmount: number;
  priceCurrency: string;
  categoryId: string;
  categoryName: string | null;
  shortDescription: string | null;
}
