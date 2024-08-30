import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
  FormsModule,
  NgForm,
} from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterOutlet } from '@angular/router';
import { ProductsService } from '../../service/products.service';
import { Product } from '../../model/product.model';
import { Store } from '@ngrx/store';
import { addProductFormSubmitted, selectProducts } from '../../state/products';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ChipsModule } from 'primeng/chips';
import { InputMaskModule } from 'primeng/inputmask';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastService } from '../../service/toast.service';

const matDesignModules = [
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatSelectModule,
  MatDialogModule,
  MatBadgeModule,
  MatSnackBarModule,
  BreadcrumbModule,
  CommonModule,
  AutoCompleteModule,
  CalendarModule,
  ChipsModule,
  DropdownModule,
  InputMaskModule,
  InputNumberModule,
  CascadeSelectModule,
  MultiSelectModule,
  InputTextareaModule,
  InputTextModule,
];

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor, matDesignModules],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.scss',
})
export class AddproductComponent {
  products$: Product[] | any;

  productForm!: FormGroup;

  addedProduct!: Product;

  categoryList = [
    {
      label: 'headphone',
      icon: 'pi pi-headphones',
    },
    {
      label: 'wearable',
      icon: 'pi pi-clock',
    },
    {
      label: 'laptop',
      icon: 'pi pi-desktop',
    },
    {
      label: 'smarthome',
      icon: 'pi pi-home',
    },
    {
      label: 'tablet',
      icon: 'pi pi-tablet',
    },
    {
      label: 'mobile',
      icon: 'pi pi-mobile',
    },
    {
      label: 'monitor',
      icon: 'pi pi-desktop',
    },
  ];

  breadCrumbs: MenuItem[] | any;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductsService,
    private router: Router,
    private store: Store,
    private toastService: ToastService
  ) {
    this.store.select(selectProducts).subscribe((x) => {
      this.products$ = x.products;
    });
    this.productForm = this.formBuilder.group({
      name: [''],
      category: [''],
      salePrice: [],
      description: [''],
      image: [''],
      quantity: [],
      brand: ['']
    });
    this.breadCrumbs = [
      {
        icon: 'pi pi-shopping-bag',
        label: 'Products',
        route: '/products',
      },
      {
        icon: 'pi pi-plus',
        label: 'Add Product',
      },
    ];
  }

  onSubmit() {
    this.addedProduct = {
      _id: Date.now().toString(),
      name: this.productForm.value['name'],
      category: this.productForm.value['category'],
      salePrice: this.productForm.value['salePrice'],
      description: this.productForm.value['description'],
      image: this.productForm.value['image'],
      code: this.generateRandomCode(8),
      rating: 5,
      quantity: this.productForm.value['quantity'],
      inventoryStatus:
        this.productForm.value['quantity'] > 10
          ? 'instock'
          : this.productForm.value['quantity'] <= 10 &&
            this.productForm.value['quantity'] > 0
          ? 'lowstock'
          : 'outofstock',
      sold: 0,
      revenue: 0,
      brand: this.productForm.value['brand']
    };
    console.log(this.addedProduct);
    // this.productService.addProduct(this.addedProduct).subscribe(x => {
    //   console.log(x);
    //   this.router.navigate(['/home'])
    // });
    this.store.dispatch(
      addProductFormSubmitted({
        product: this.addedProduct,
      })
    );
    this.toastService.showInfoToast(
      'New Product',
      'Product successfully added'
    );
    this.router.navigate(['/products']);
  }

  generateRandomCode(length: number): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const currentProductTotal = this.products$.length.toString();
    let code = '';

    for (let i = 0; i < length; i++) {
      if (Math.random() < 0.5) {
        code += letters[Math.floor(Math.random() * letters.length)];
      } else {
        code += numbers[Math.floor(Math.random() * numbers.length)];
      }
    }

    return code + currentProductTotal;
  }

  
}
