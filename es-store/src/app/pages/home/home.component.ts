import { Component } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { Observable } from 'rxjs';
import { Product } from '../../model/product.model';
import { CommonModule } from '@angular/common';
import { DataView, DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { CartService } from '../../service/cart.service';
import { DialogModule } from 'primeng/dialog';
import { ToastService } from '../../service/toast.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'es-home',
  standalone: true,
  imports: [
    CommonModule,
    DataViewModule,
    RatingModule,
    SidebarComponent,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    ButtonModule,
    CommonModule,
    DataViewModule,
    DropdownModule,
    InputTextModule,
    RatingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    SidebarModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  products$: Observable<Product[]> | any;
  filteredProducts$: Observable<Product[]> | any;
  temp = {
    label: 'Price High to Low',
    value: '!salePrice',
  };
  sortOptions: SelectItem[] = [
    {
      label: 'Price High to Low',
      value: '!salePrice',
    },
    {
      label: 'Price Low to High',
      value: 'salePrice',
    },
    {
      label: 'Alphabet A to Z',
      value: 'name',
    },
    {
      label: 'Alphabet Z to A',
      value: '!name',
    },
    {
      label: 'Stock High to Low',
      value: '!quantity',
    },
    {
      label: 'Stock Low to High',
      value: 'quantity',
    },
    {
      label: 'Sold High to Low',
      value: '!sold',
    },
    {
      label: 'Sold Low to High',
      value: 'sold',
    },
    {
      label: 'Rating High to Low',
      value: '!rating',
    },
    {
      label: 'Rating Low to High',
      value: 'rating',
    },
  ];

  sortField: string = '';
  sortOrder: number = 0;

  sortForm!: FormGroup;

  priceOptions: SelectItem[] = [
    {
      label: '0-50',
      value: '0-50',
    },
    {
      label: '51-100',
      value: '51-100',
    },
    {
      label: '101-500',
      value: '101-500',
    },
    {
      label: '501-1000',
      value: '501-1000',
    },
    {
      label: 'More than 1000',
      value: '1000',
    },
  ];

  priceFilterField: string = '';
  maxPrice: number = 0;
  minPrice: number = 0;
  priceForm!: FormGroup;

  addToCartProduct: Product | any;

  addToCartDialog: boolean = false;

  addToCartQuantity: number = 1;

  addQuantity() {
    this.addToCartQuantity += 1;
  }

  minusQuantity() {
    if (this.addToCartQuantity === 1) {
      this.addToCartQuantity = 1;
    } else {
      this.addToCartQuantity -= 1;
    }
  }

  showAddToCartDialog(product: Product) {
    this.addToCartDialog = true;
    this.addToCartProduct = product;
  }

  closeAddToCartDialog() {
    this.addToCartDialog = false;
  }

  addCart(product: Product, quantity: number) {
    this.cartService.editProductQuantity(product, quantity);
    this.closeAddToCartDialog();
    this.addToCartQuantity = 1;
  }

  constructor(
    private productService: ProductsService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private confirmationService: ConfirmationService,
    private toastService: ToastService
  ) {
    this.productService.getProducts().subscribe((products) => {
      this.products$ = products;
      this.filteredProducts$ = this.products$;
    });

    this.sortForm = this.formBuilder.group({
      sort: [''],
    });
    this.sortForm.get('sort')?.valueChanges.subscribe((value) => {
      this.applySortFilter(value);
    });

    this.priceForm = this.formBuilder.group({
      priceRange: [''],
      priceMax: [0],
      priceMin: [0],
    });
    this.priceForm.get('priceRange')?.valueChanges.subscribe((value) => {
      this.applyPriceFilter(value);
      this.priceForm.patchValue({
        priceMax: 0,
        priceMin: 0,
      });
    });
  }

  confirmAddCart(e: Event, product: Product, quantity: number) {
    this.confirmationService.confirm({
      target: e.target as EventTarget,
      message: 'Do you want to add this product to cart: ' + product.name + '?',
      header: 'Add to Cart Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-text p-button-text',
      rejectButtonStyleClass: 'p-button-warning p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        this.addCart(product, quantity);
        this.toastService.showSuccessToast(
          'Confirmed',
          product.name + ' successfully added to cart!'
        );
      },
      reject: () => {},
    });
  }

  clearFilter() {
    this.filteredProducts$ = this.products$;
    this.sortForm.patchValue({
      sort: '',
    });
    this.priceForm.patchValue({
      priceRange: '',
      priceMax: 0,
      priceMin: 0,
    });
  }

  onFilter(dv: DataView, event: Event) {
    dv.filter((event.target as HTMLInputElement).value);
  }

  applyPriceLimit() {
    if (this.priceForm.value['priceMax'] > this.priceForm.value['priceMin']) {
      this.maxPrice = this.priceForm.value['priceMax'];
      this.minPrice = this.priceForm.value['priceMin'];
      this.priceForm.patchValue({
        priceRange: '',
        priceMax: this.maxPrice,
        priceMin: this.minPrice,
      });
      this.applyFilters();
    }
  }

  applyPriceFilter(value: any) {
    this.priceFilterField = value;
    this.applyFilters();
  }

  applySortFilter(value: any) {
    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }

    this.applyFilters();
  }

  applyFilters() {
    this.filteredProducts$ = this.products$;

    if (this.priceForm.value['priceMax'] > this.priceForm.value['priceMin']) {
      this.filteredProducts$ = this.products$.filter(
        (product: Product) =>
          product.salePrice < this.maxPrice && product.salePrice > this.minPrice
      );
    }

    if (this.priceFilterField) {
      if (this.priceFilterField === '0-50') {
        this.filteredProducts$ = this.products$.filter(
          (product: Product) => product.salePrice <= 50 && product.salePrice > 0
        );
      } else if (this.priceFilterField === '51-100') {
        this.filteredProducts$ = this.products$.filter(
          (product: Product) =>
            product.salePrice <= 100 && product.salePrice > 50
        );
      } else if (this.priceFilterField === '101-500') {
        this.filteredProducts$ = this.products$.filter(
          (product: Product) =>
            product.salePrice <= 500 && product.salePrice > 100
        );
      } else if (this.priceFilterField === '501-1000') {
        this.filteredProducts$ = this.products$.filter(
          (product: Product) =>
            product.salePrice <= 1000 && product.salePrice > 501
        );
      } else {
        this.filteredProducts$ = this.products$.filter(
          (product: Product) => product.salePrice > 1000
        );
      }
    }

    if (this.sortField) {
      this.filteredProducts$ = [...this.filteredProducts$].sort(
        (a: Product, b: Product) => {
          let result = 0;

          if (this.sortField === 'name') {
            result = a['name'].localeCompare(b['name']);
          } else if (this.sortField === 'salePrice') {
            if (a['salePrice'] < b['salePrice']) {
              result = -1;
            } else if (a['salePrice'] > b['salePrice']) {
              result = 1;
            }
          } else if (this.sortField === 'quantity') {
            if (a['quantity'] < b['quantity']) {
              result = -1;
            } else if (a['quantity'] > b['quantity']) {
              result = 1;
            }
          } else if (this.sortField === 'sold') {
            if (a['sold'] < b['sold']) {
              result = -1;
            } else if (a['sold'] > b['sold']) {
              result = 1;
            }
          } else if (this.sortField === 'rating') {
            if (a['rating'] < b['rating']) {
              result = -1;
            } else if (a['rating'] > b['rating']) {
              result = 1;
            }
          }

          return result * this.sortOrder;
        }
      );
    }
  }
}
