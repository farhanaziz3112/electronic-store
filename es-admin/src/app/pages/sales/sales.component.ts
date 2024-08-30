import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { PurchasesService } from '../../service/purchases.service';
import { forkJoin, map, mergeMap, Observable } from 'rxjs';
import { Purchase } from '../../model/purchase.model';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { InputTextModule } from 'primeng/inputtext';
import { ProductPurchase } from '../../model/productpurchase.model';
import { ProductpurchaseService } from '../../service/productpurchase.service';
import { ProductsService } from '../../service/products.service';
import { Product } from '../../model/product.model';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { DividerModule } from 'primeng/divider';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { RatingModule } from 'primeng/rating';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToastModule } from 'primeng/toast';
import { SelectItem } from 'primeng/api';

interface expandedRows {
  [key: string]: boolean;
}

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [
    CommonModule,
    TabViewModule,
    TableModule,
    StyleClassModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    MenuModule,
    StyleClassModule,
    PanelMenuModule,
    CommonModule,
    DataViewModule,
    InputTextModule,
    DividerModule,
    RatingModule,
    FormsModule,
    SelectButtonModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss',
})
export class SalesComponent {
  purchases$: Observable<Purchase[]> | any;
  products$: Observable<Product[]> | any;
  totalPurchases: number | any;
  totalRevenue: number | any;
  totalProductSold: number | any;
  productPurchases$: Observable<ProductPurchase[]> | any;
  filteredProductPurchases$: Observable<ProductPurchase[]> | any;

  data$: Observable<any[]> | any;
  filtereddata$: Observable<any[]> | any;

  sortOrder: number = 0;
  sortField: string = '';

  expandedRows: expandedRows = {};

  isExpanded: boolean = false;

  sortOptions: SelectItem[] = [
    {
      label: 'Total Price High to Low',
      value: '!totalPrice',
    },
    {
      label: 'Total Price Low to High',
      value: 'totalPrice',
    },
    {
      label: 'Quantity High to Low',
      value: '!quantity',
    },
    {
      label: 'Quantity Low to High',
      value: 'quantity',
    },
  ];

  constructor(
    private purchaseService: PurchasesService,
    private productPurchaseService: ProductpurchaseService,
    private productService: ProductsService
  ) {
    this.purchaseService.getPurchases().subscribe((value) => {
      this.purchases$ = value;
      this.totalPurchases = value.length;
      this.totalRevenue = this.getTotalRevenue(value);
      this.totalProductSold = this.getProductSold(value);
    });
    this.mergePurchasesWithProductPurchases();
  }

  expandAll() {
    if (!this.isExpanded) {
      this.data$.forEach((data: { _id: any }) =>
        data && data._id ? (this.expandedRows[data._id] = true) : ''
      );
    } else {
      this.expandedRows = {};
    }
    this.isExpanded = !this.isExpanded;
  }

  getTotalRevenue(purchases: Purchase[]): number {
    let total = 0;
    for (let i = 0; i < purchases.length; i++) {
      total += purchases[i].totalPrice;
    }
    return total;
  }

  getProductSold(purchases: Purchase[]): number {
    let total = 0;
    for (let i = 0; i < purchases.length; i++) {
      total += purchases[i].quantity;
    }
    return total;
  }

  mergePurchasesWithProductPurchases() {
    // this.productPurchaseService
    //   .getProductPurchasesByPurchaseId(id)
    //   .pipe(
    //     mergeMap((productPurchase) => {
    //       this.productPurchases$ = productPurchase;
    //       const productCodes = productPurchase.map(
    //         (purchase) => purchase.productCode
    //       );
    //       const productRequests = productCodes.map((code) => {
    //         this.productService.getProductByCode(code);
    //       });
    //       return forkJoin(productRequests);
    //     })
    //   )
    //   .subscribe((products) => {
    //     this.products$ = products;
    //     console.log(products);
    //   });
    // this.filteredProductPurchases$ = this.productPurchases$;
    // this.productPurchaseService
    //   .getProductPurchasesByPurchaseId(id)
    //   .subscribe((value) => {
    //     this.filteredProductPurchases$ = value;
    //   });
    // Fetch Purchase and ProductPurchases by Purchase ID

    // forkJoin({
    //   purchase: this.purchaseService.getPurchase(id),
    //   productPurchases:
    //     this.productPurchaseService.getProductPurchasesByPurchaseId(id),
    // })
    //   .pipe(
    //     map(({ purchase, productPurchases }) => {
    //       // Create a mapping of ProductPurchase items by purchaseId
    //       const productPurchasesMap = productPurchases.reduce((map, pp) => {
    //         if (!map[pp.purchaseId]) {
    //           map[pp.purchaseId] = [];
    //         }
    //         map[pp.purchaseId].push(pp);
    //         return map;
    //       }, {} as Record<string, ProductPurchase[]>);

    //       // Merge ProductPurchases into Purchase
    //       return {
    //         ...purchase,
    //         productPurchases: productPurchasesMap[purchase._id] || [],
    //       };
    //     })
    //   )
    //   .subscribe((purchaseWithProductPurchases) => {
    //     // Handle the merged data
    //     console.log(purchaseWithProductPurchases);
    //   });

    // Fetch all purchases and all product purchases

    forkJoin({
      purchases: this.purchaseService.getPurchases(),
      productPurchases: this.productPurchaseService.getProductPurchases(), // Assume this method fetches all product purchases
    })
      .pipe(
        map(({ purchases, productPurchases }) => {
          // Create a mapping of ProductPurchase items by purchaseId
          const productPurchasesMap = productPurchases.reduce((map, pp) => {
            if (!map[pp.purchaseId]) {
              map[pp.purchaseId] = [];
            }
            map[pp.purchaseId].push(pp);
            return map;
          }, {} as Record<string, ProductPurchase[]>);

          // Merge ProductPurchases into Purchases
          return purchases.map((purchase) => ({
            ...purchase,
            productPurchases: productPurchasesMap[purchase._id] || [],
          }));
        })
      )
      .subscribe((purchasesWithProductPurchases) => {
        // this.purchases$ = purchasesWithProductPurchases;
        this.data$ = purchasesWithProductPurchases;
        this.filtereddata$ = this.data$;
      });
  }

  onTableFilter(table: Table, event: Event) {
    table.filter((event.target as HTMLInputElement).value, '_id', 'contains');
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

    this.filtereddata$ = [...this.data$].sort(
      (a: any, b: any) => {
        let result = 0;

        if (this.sortField === 'totalPrice') {
          if (a['totalPrice'] < b['totalPrice']) {
            result = -1;
          } else if (a['totalPrice'] > b['totalPrice']) {
            result = 1;
          }
        } else {
          if (a['quantity'] < b['quantity']) {
            result = -1;
          } else if (a['quantity'] > b['quantity']) {
            result = 1;
          }
        }

        return result * this.sortOrder;
      }
    )
    
  }


}
