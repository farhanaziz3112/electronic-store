import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ChipsModule } from 'primeng/chips';
import { InputMaskModule } from 'primeng/inputmask';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { forkJoin, map, Observable } from 'rxjs';
import { Product } from '../../model/product.model';
import { Router } from '@angular/router';
import { CartService } from '../../service/cart.service';
import { ToastService } from '../../service/toast.service';
import { TableModule } from 'primeng/table';
import { ProductpurchaseService } from '../../service/productpurchase.service';
import { ProductsService } from '../../service/products.service';
import { PurchasesService } from '../../service/purchases.service';
import { Purchase } from '../../model/purchase.model';
import { ProductPurchase } from '../../model/productpurchase.model';

interface expandedRows {
  [key: string]: boolean;
}

@Component({
  selector: 'es-purchase',
  standalone: true,
  imports: [
    BreadcrumbModule,
    AutoCompleteModule,
    ConfirmDialogModule,
    CalendarModule,
    ChipsModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    CascadeSelectModule,
    MultiSelectModule,
    InputTextareaModule,
    InputTextModule,
    CommonModule,
    TabViewModule,
    DialogModule,
    RatingModule,
    ToastModule,
    CommonModule,
    TableModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.scss',
})
export class PurchaseComponent {
  breadCrumbs: MenuItem[] = [
    {
      icon: 'pi pi-home',
      label: 'Home',
      route: '/',
    },
    {
      icon: 'pi pi-user',
      label: 'User',
    },
    {
      icon: 'pi pi-shopping-cart',
      label: 'Purchase',
    },
  ];

  cartProducts$: Observable<Product[]> | any;
  numberOfItem: number = 0;
  cartTotalPrice: number = 0;

  purchases$: Observable<Purchase[]> | any;
  productPurchases$: Observable<ProductPurchase[]> | any;
  data$: Observable<any[]> | any;

  expandedRows: expandedRows = {};

  constructor(
    private cartService: CartService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private toastService: ToastService,
    private purchaseService: PurchasesService,
    private productPurchaseService: ProductpurchaseService,
    private productService: ProductsService
  ) {
    this.cartService.getCart().subscribe((x) => {
      this.cartProducts$ = x;
      this.numberOfItem = x.length;
      this.cartTotalPrice = this.cartService.getCartTotal();
    });
    this.mergePurchasesWithProductPurchases('toship');
  }

  addCart(product: Product) {
    this.cartService.editProductQuantity(product, 1);
  }

  minusCart(product: Product, event: Event) {
    if (product.quantity === 1) {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Do you want to remove this product from cart?',
        header: 'Remove Confirmation',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-text',
        rejectButtonStyleClass: 'p-button-text p-button-text',
        acceptIcon: 'none',
        rejectIcon: 'none',
        accept: () => {
          this.cartService.editProductQuantity(product, -1);
          this.toastService.showInfoToast(
            'Confirmed',
            product.name + ' successfully removed from cart!'
          );
        },
        reject: () => {},
      });
    } else {
      this.cartService.editProductQuantity(product, -1);
    }
  }

  clearCart() {
    this.cartService.clearCart();
  }

  checkOut(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to check out this cart?',
      header: 'Checkout Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        this.cartService.checkOut();
      },
      reject: () => {},
    });
  }

  ngOnInit() {}

  mergePurchasesWithProductPurchases(status: string) {
    forkJoin({
      purchases: this.purchaseService.getPurchasesByStatus(status),
      products: this.productService.getProducts(),
      productPurchases: this.productPurchaseService.getProductPurchases(), // Assume this method fetches all product purchases
    })
      .pipe(
        map(({ purchases, productPurchases, products }) => {
          // Create a mapping of ProductPurchase items by purchaseId
          const productPurchasesMap = productPurchases.reduce((map, pp) => {
            if (!map[pp.purchaseId]) {
              map[pp.purchaseId] = [];
            }
            map[pp.purchaseId].push(pp);
            return map;
          }, {} as Record<string, ProductPurchase[]>);

          const productMap = products.reduce((map, product) => {
            map[product.code] = product;
            return map;
          }, {} as Record<string, Product>);

          // Merge ProductPurchases into Purchases
          return purchases.map((purchase) => ({
            ...purchase,
            productPurchases:
              productPurchasesMap[purchase._id]?.map((pp) => ({
                ...pp,
                image: productMap[pp.productCode]?.image || null,
              })) || [],
          }));
        })
      )
      .subscribe((purchasesWithProductPurchases) => {
        // this.purchases$ = purchasesWithProductPurchases;
        this.data$ = purchasesWithProductPurchases;
        console.log(this.data$);
        
      });
  }
}
