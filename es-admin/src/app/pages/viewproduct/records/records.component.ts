import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, switchMap } from 'rxjs';
import { ProductsService } from '../../../service/products.service';
import { selectProductItem } from '../../../state/products';
import { ProductPurchase } from '../../../model/productpurchase.model';
import { ProductpurchaseService } from '../../../service/productpurchase.service';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { StyleClassModule } from 'primeng/styleclass';
import { Table, TableModule } from 'primeng/table';
import { DataViewModule } from 'primeng/dataview';
import { DataView } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { SelectItem } from 'primeng/api';
import { Purchase } from '../../../model/purchase.model';
import { PurchasesService } from '../../../service/purchases.service';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MenuModule,
    TableModule,
    StyleClassModule,
    PanelMenuModule,
    ButtonModule,
    CommonModule,
    DataViewModule,
    DropdownModule,
    InputTextModule,
    DividerModule,
    RatingModule,
    DialogModule,
  ],
  templateUrl: './records.component.html',
  styleUrl: './records.component.scss',
})
export class RecordsComponent {
  product$!: Observable<any> | any;
  purchase$!: Observable<Purchase> | any;
  productpurchases$!: Observable<ProductPurchase[]> | any;
  productTotalSold: number | any;
  productTotalRevenue: number | any;
  productTotalPurchase: number | any;
  viewProductPurchase: ProductPurchase | any;
  purchaseDialogVisible: boolean = false;

  productId$ = this.activatedRoute.params.pipe(map((params) => params['id']));
  productState$ = this.productId$
    .pipe(switchMap((_id) => this.store.select(selectProductItem({ id: _id }))))
    .subscribe((x) => {
      this.product$ = x;
      this.productPurchaseService
        .getProductPurchasesByCode(this.product$['code'])
        .subscribe((value) => {
          this.productpurchases$ = value;
          this.productTotalSold = this.getQuantityProductSold(value);
          this.productTotalRevenue = this.getTotalRevenue(value);
          this.productTotalPurchase = value.length;
        });
    });

  sortOptions: SelectItem[] = [
    {
      label: 'Quantity High to Low',
      value: '!quantity',
    },
    {
      label: 'Quantity Low to High',
      value: 'quantity',
    },
    {
      label: 'Total Price High to Low',
      value: '!totalPrice',
    },
    {
      label: 'Total Price Low to High',
      value: 'totalPrice',
    },
    {
      label: 'Date Latest to Oldest',
      value: '!date',
    },
    {
      label: 'Date Oldest to Latest',
      value: 'date',
    },
  ];

  sortOrder: number = 0;
  sortField: string = '';

  constructor(
    private productService: ProductsService,
    private productPurchaseService: ProductpurchaseService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private purchaseService: PurchasesService
  ) {}

  showPurchaseDialog(purchase: ProductPurchase) {
    this.purchaseService.getPurchase(purchase.purchaseId).subscribe(
      x => {
        this.purchase$ = x;
      }
    )
    this.viewProductPurchase = purchase;
    this.purchaseDialogVisible = true;
  }

  closePurchaseDialog() {
    this.purchaseDialogVisible = false;
  }

  getQuantityProductSold(purchases: ProductPurchase[]): number {
    let total = 0;
    for (let i = 0; i < purchases.length; i++) {
      total += purchases[i].quantity;
    }
    return total;
  }

  getTotalRevenue(purchases: ProductPurchase[]): number {
    let total = 0;
    for (let i = 0; i < purchases.length; i++) {
      total += purchases[i].totalPrice;
    }
    return total;
  }

  onSortChange(event: any) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }

    this.productpurchases$ = [...this.productpurchases$].sort(
      (a: ProductPurchase, b: ProductPurchase) => {
        let result = 0;

        if (this.sortField === 'quantity') {
          if (a['quantity'] < b['quantity']) {
            result = -1;
          } else if (a['quantity'] > b['quantity']) {
            result = 1;
          }
        } else if (this.sortField === 'totalPrice') {
          if (a['totalPrice'] < b['totalPrice']) {
            result = -1;
          } else if (a['quantity'] > b['quantity']) {
            result = 1;
          }
        } else {
          if (a['date'].getTime() < b['date'].getTime()) {
            result = -1;
          } else if (a['date'].getTime() > b['date'].getTime()) {
            result = 1;
          }
        }

        return result * this.sortOrder;
      }
    );
  }
}
