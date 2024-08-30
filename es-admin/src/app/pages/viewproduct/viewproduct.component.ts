import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ProductsService } from '../../service/products.service';
import { Product } from '../../model/product.model';
import { map, Observable, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  deleteProductInitiated,
  editProductFormSubmitted,
  selectProductItem,
} from '../../state/products';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
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
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { StatisticsComponent } from './statistics/statistics.component';
import { RecordsComponent } from './records/records.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
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
];

@Component({
  selector: 'app-viewproduct',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    matDesignModules,
    StatisticsComponent,
    RecordsComponent,
  ],
  providers: [ConfirmationService],
  templateUrl: './viewproduct.component.html',
  styleUrl: './viewproduct.component.scss',
})
export class ViewproductComponent implements OnInit {
  productForm!: FormGroup;
  editProduct!: Product;
  product$!: Observable<any> | any;

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

  editDialogVisible: boolean = false;
  deleteDialogVisible: boolean = false;

  breadCrumbs: MenuItem[] | any;

  productId$ = this.activatedRoute.params.pipe(map((params) => params['id']));
  productState$ = this.productId$
    .pipe(switchMap((_id) => this.store.select(selectProductItem({ id: _id }))))
    .subscribe((x) => {
      this.product$ = x;
      this.productForm = this.formBuilder.group({
        name: x?.name,
        category: x?.category,
        salePrice: x?.salePrice,
        description: x?.description,
        image: x?.image,
        quantity: x?.quantity,
        brand: x?.brand
      });
      this.breadCrumbs = [
        {
          icon: 'pi pi-shopping-bag',
          label: 'Products',
          route: '/products',
        },
        {
          icon: 'pi pi-plus',
          label: this.product$?.name,
        },
      ];
    });

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private confirmationService: ConfirmationService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    // this.productId = this.activatedRoute.paramMap.subscribe((params) => {
    //   console.log(params);
    //   this.productId = params.get('id');
    //   this.productService.getProduct(this.productId).subscribe((x) => {
    //     this.product$ = x;
    // this.productForm = this.formBuilder.group({
    //   name: x.name,
    //   category: x.category,
    //   salePrice: x.salePrice,
    //   description: x.description,
    //   image: x.image,
    // });
    //   });
    // });
  }

  showEditDialog() {
    this.editDialogVisible = true;
  }

  closeEditDialog() {
    this.editDialogVisible = false;
  }

  confirmDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this product?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        this.store.dispatch(
          deleteProductInitiated({
            productId: this.product$._id,
          })
        );
        this.toastService.showInfoToast(
          'Confirmed',
          this.product$.name + ' successfully deleted!'
        );
        this.router.navigate(['/products']);
      },
      reject: () => {},
    });
  }

  onEdit() {
    this.editProduct = {
      _id: this.product$._id,
      name: this.productForm.value['name'],
      category: this.productForm.value['category'],
      salePrice: this.productForm.value['salePrice'],
      description: this.productForm.value['description'],
      image: this.productForm.value['image'],
      code: this.product$.code,
      rating: this.product$.rating,
      quantity: this.productForm.value['quantity'],
      inventoryStatus:
        this.productForm.value['quantity'] > 10
          ? 'instock'
          : this.productForm.value['quantity'] <= 10 &&
            this.productForm.value['quantity'] > 0
          ? 'lowstock'
          : 'outofstock',
      sold: this.product$.sold,
      revenue: this.product$.revenue,
      brand: this.productForm.value['brand']
    };
    this.store.dispatch(
      editProductFormSubmitted({
        product: this.editProduct,
      })
    );
    this.toastService.showInfoToast(
      'Confirmed',
      this.product$.name + ' successfully edited!'
    );
    this.closeEditDialog();
  }
}
