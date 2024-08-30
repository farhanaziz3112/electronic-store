import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProductPurchase } from '../model/productpurchase.model';

const PRODUCTPURCHASES_API = 'http://localhost:3000/productpurchases';

@Injectable({
  providedIn: 'root',
})
export class ProductpurchaseService {
  constructor(private http: HttpClient) {}

  getProductPurchases() {
    return this.http
      .get<ProductPurchasesApiResponse>(PRODUCTPURCHASES_API)
      .pipe(
        map((response) =>
          response.productPurchasesData.map((purchase) => ({
            ...purchase,
            date: new Date(purchase.date),
          }))
        )
      );
  }

  getProductPurchasesByCode(id: string) {
    const url = `${PRODUCTPURCHASES_API}/code/${id}`;
    return this.http.get<ProductPurchasesApiResponse>(url).pipe(
      map((response) =>
        response.productPurchasesData.map((purchase) => ({
          ...purchase,
          date: new Date(purchase.date),
        }))
      )
    );
  }

  getProductPurchasesByPurchaseId(id: string) {
    const url = `${PRODUCTPURCHASES_API}/purchase/${id}`;
    return this.http.get<ProductPurchasesApiResponse>(url).pipe(
      map((response) =>
        response.productPurchasesData.map((purchase) => ({
          ...purchase,
          date: new Date(purchase.date),
        }))
      )
    );
  }

  getProductPurchase(id: string) {
    const url = `${PRODUCTPURCHASES_API}/${id}`;
    return this.http
      .get<ProductPurchaseApiResponse>(url)
      .pipe(map((response) => ({
        ...response.existingProductPurchase,
        date: new Date(response.existingProductPurchase.date)
      })));
  }

  deleteProductPurchase(id: string) {
    const url = `${PRODUCTPURCHASES_API}/${id}`;
    return this.http.delete<void>(url);
  }

  updateProductPurchase(
    id: string,
    productpurchase: ProductPurchase
  ): Observable<ProductPurchase> {
    const url = `${PRODUCTPURCHASES_API}/${id}`;
    return this.http.put<ProductPurchase>(url, productpurchase, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  addProduct(productpurchase: ProductPurchase): Observable<ProductPurchase> {
    console.log('adding product...' + productpurchase);

    return this.http.post<ProductPurchase>(
      PRODUCTPURCHASES_API,
      productpurchase,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }
}

export interface ProductPurchasesApiResponse {
  message: string;
  productPurchasesData: ProductPurchase[];
}

export interface ProductPurchaseApiResponse {
  message: string;
  existingProductPurchase: ProductPurchase;
}
