import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Purchase } from '../model/purchase.model';

const PURCHASES_API = 'http://localhost:3000/purchases';

@Injectable({
  providedIn: 'root',
})
export class PurchasesService {
  constructor(private http: HttpClient) {}

  getPurchases() {
    return this.http.get<PurchasesApiResponse>(PURCHASES_API).pipe(
      map((response) =>
        response.purchaseData.map((purchase) => ({
          ...purchase,
          date: new Date(purchase.date),
        }))
      )
    );
  }

  getPurchase(id: string) {
    const url = `${PURCHASES_API}/${id}`;
    return this.http.get<PurchaseApiResponse>(url).pipe(
      map((response) => ({
        ...response.existingPurchase,
        date: new Date(response.existingPurchase.date),
      }))
    );
  }

  deletePurchase(id: string) {
    const url = `${PURCHASES_API}/${id}`;
    return this.http.delete<void>(url);
  }

  updatePurchase(id: string, purchase: Purchase): Observable<Purchase> {
    const url = `${PURCHASES_API}/${id}`;
    return this.http.put<Purchase>(url, purchase, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  addPurchase(purchase: Purchase): Observable<Purchase> {
    console.log('adding purchase...' + purchase);

    return this.http.post<Purchase>(PURCHASES_API, purchase, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
}

export interface PurchasesApiResponse {
  message: string;
  purchaseData: Purchase[];
}

export interface PurchaseApiResponse {
  message: string;
  existingPurchase: Purchase;
}
