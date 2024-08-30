import { Injectable } from '@angular/core';
import {
  HttpClientModule,
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../model/product.model';

const PRODUCTS_API = 'http://localhost:3000/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http
      .get<ProductsApiResponse>(PRODUCTS_API)
      .pipe(map((response) => response.productData));
  }

  getProduct(id: string) {
    const url = `${PRODUCTS_API}/${id}`;
    return this.http
      .get<ProductApiResponse>(url)
      .pipe(map((response) => response.existingProduct));
  }
  
  getProductByCode(code: string) {
    const url = `${PRODUCTS_API}/code/${code}`;
    return this.http
      .get<ProductApiResponse>(url)
      .pipe(map((response) => response.existingProduct));
  }

  deleteProduct(id: string) {
    const url = `${PRODUCTS_API}/${id}`;
    return this.http.delete<void>(url);
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    const url = `${PRODUCTS_API}/${id}`;
    return this.http.put<Product>(url, product, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  addProduct(product: Product): Observable<Product> {
    console.log('adding product...' + product);
    
    return this.http.post<Product>(PRODUCTS_API, product, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
}

export interface ProductsApiResponse {
  message: string;
  productData: Product[];
}

export interface ProductApiResponse {
  message: string;
  existingProduct: Product;
}
