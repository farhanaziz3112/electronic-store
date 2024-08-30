import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { StyleClassModule } from 'primeng/styleclass';
import { Table, TableModule } from 'primeng/table';
import { selectProduct, selectProducts } from '../../state/products';
import { DataViewModule } from 'primeng/dataview';
import { DataView } from 'primeng/dataview';
import { Product } from '../../model/product.model';
import { filter, map, Observable } from 'rxjs';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { RatingModule } from 'primeng/rating';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToastService } from '../../service/toast.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
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
    FormsModule,
    SelectButtonModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  products$: Product[] | any;
  filteredproducts$: Product[] | any;

  viewForm!: FormGroup;

  viewOptions: any[] = [
    {
      icon: 'pi pi-align-justify',
      view: 'table',
    },
    {
      icon: 'pi pi-th-large',
      view: 'grid',
    },
  ];

  statusOptions: SelectItem[] = [
    {
      label: 'Instock',
      value: 'instock',
    },
    {
      label: 'Low Stock',
      value: 'lowstock',
    },
    {
      label: 'Out of Stock',
      value: 'outofstock',
    },
    {
      label: 'All',
      value: 'all',
    },
  ];

  categoryOptions: SelectItem[] = [
    {
      label: 'Headphone',
      value: 'headphone',
    },
    {
      label: 'Wearable',
      value: 'wearable',
    },
    {
      label: 'Laptop',
      value: 'laptop',
    },
    {
      label: 'Smarthome',
      value: 'smarthome',
    },
    {
      label: 'Tablet',
      value: 'tablet',
    },
    {
      label: 'Mobile',
      value: 'mobile',
    },
    {
      label: 'Monitor',
      value: 'monitor',
    },
    {
      label: 'All',
      value: 'all',
    },
  ];

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
      label: 'Quantity High to Low',
      value: '!quantity',
    },
    {
      label: 'Quantity Low to High',
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
      label: 'Revenue High to Low',
      value: '!revenue',
    },
    {
      label: 'Revenue Low to High',
      value: 'revenue',
    },
  ];

  selectedStatus: string = 'all';
  selectedCategory: string = 'all';
  sortOrder: number = 0;
  sortField: string = '';

  constructor(
    private store: Store<any>,
    private router: Router,
    private messageService: MessageService,
    private toastService: ToastService
  ) {
    this.store.select(selectProducts).subscribe((x) => {
      this.products$ = x.products;
      this.filteredproducts$ = this.products$;
    });
    // this.products$ = this.store
    //   .select(selectProducts)
    //   .pipe(map((state) => state.products || []));
    this.viewForm = new FormGroup({
      value: new FormControl('table'),
    });
  }

  switchView() {
    this.filteredproducts$ = this.products$;
  }

  viewProduct(id: string): void {
    this.router.navigate(['/products', id]);
  }

  addProduct(): void {
    this.router.navigate(['/products/addproduct']);
  }

  onFilter(dv: DataView, event: Event) {
    dv.filter((event.target as HTMLInputElement).value);
  }

  onTableFilter(table: Table, event: Event) {
    table.filter((event.target as HTMLInputElement).value, 'name', 'contains');
  }

  // onStatusFilter(table: Table, event: any) {
  //   table.filter((event.target as HTMLInputElement).value, 'status', 'contains');
  // }

  onSortChange(event: any) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }

    this.applyFilters();
  }

  onStatusChange(event: any) {
    this.selectedStatus = event.value;

    this.applyFilters();
  }

  onCategoryChange(event: any) {
    this.selectedCategory = event.value;

    this.applyFilters();
  }

  applyFilters() {
    this.filteredproducts$ = this.products$;

    if (this.selectedStatus != 'all') {
      this.filteredproducts$ = this.filteredproducts$.filter(
        (product: any) => product.inventoryStatus === this.selectedStatus
      );
    }

    if (this.selectedCategory != 'all') {
      this.filteredproducts$ = this.filteredproducts$.filter(
        (product: any) => product.category === this.selectedCategory
      );
    }

    if (this.sortField) {
      this.filteredproducts$ = [...this.filteredproducts$].sort(
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
          } else {
            if (a['revenue'] < b['revenue']) {
              result = -1;
            } else if (a['revenue'] > b['revenue']) {
              result = 1;
            }
          }

          return result * this.sortOrder;
        }
      );
    }
  }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as {
      message: string;
      severity: string;
    };
    if (state) {
      this.messageService.add({
        severity: state.severity,
        summary: 'Confirmation',
        detail: state.message,
      });
      console.log('message added');
    }
  }
}
