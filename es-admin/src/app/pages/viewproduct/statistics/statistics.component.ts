import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { RatingModule } from 'primeng/rating';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { Observable, map, switchMap } from 'rxjs';
import { ProductPurchase } from '../../../model/productpurchase.model';
import { Purchase } from '../../../model/purchase.model';
import { ProductpurchaseService } from '../../../service/productpurchase.service';
import { ProductsService } from '../../../service/products.service';
import { PurchasesService } from '../../../service/purchases.service';
import { selectProductItem } from '../../../state/products';
import { ProgressBarModule } from 'primeng/progressbar';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-statistics',
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
    ProgressBarModule,
    ChartModule,
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent implements OnInit {
  product$!: Observable<any> | any;
  purchase$!: Observable<Purchase> | any;
  productpurchases$!: Observable<ProductPurchase[]> | any;
  allproductpurchases$!: Observable<ProductPurchase[]> | any;
  productTotalSold: number | any;
  productTotalRevenue: number | any;
  productTotalPurchase: number | any;
  allProductRevenue: number | any;
  viewProductPurchase: ProductPurchase | any;
  purchaseDialogVisible: boolean = false;

  revenueTarget = 43000;
  progressValue = 0;

  productId$ = this.activatedRoute.params.pipe(map((params) => params['id']));
  productState$ = this.productId$
    .pipe(switchMap((_id) => this.store.select(selectProductItem({ id: _id }))))
    .subscribe((x) => {
      this.product$ = x;
      this.productPurchaseService.getProductPurchases().subscribe((value) => {
        this.allproductpurchases$ = value;
      });
      this.productPurchaseService
        .getProductPurchasesByCode(this.product$['code'])
        .subscribe((value) => {
          this.productpurchases$ = value;
          this.productTotalSold = this.getQuantityProductSold(value);
          this.productTotalRevenue = this.getTotalRevenue(value);
          this.allProductRevenue = this.getTotalRevenue(
            this.allproductpurchases$
          );
          this.productTotalPurchase = value.length;
          this.progressValue = this.getTargetPercentage();
          this.updateChart();
        });
    });

  lineChartData: any;
  lineChartOptions: any;

  barChartData: any;
  barChartOptions: any;

  donutChartData: any;
  donutChartOptions: any;

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.lineChartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
    this.barChartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
    this.donutChartOptions = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor,
          },
        },
      },
    };
  }

  constructor(
    private productService: ProductsService,
    private productPurchaseService: ProductpurchaseService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private purchaseService: PurchasesService
  ) {}

  getTargetPercentage(): number {
    return parseFloat(
      ((this.productTotalRevenue / this.revenueTarget) * 100).toFixed(2)
    );
  }

  getMonthTotalSold(month: number): number {
    let total = 0;
    let filteredProduct = this.productpurchases$.filter(
      (purchase: ProductPurchase) =>
        new Date(purchase.date).getMonth() === month
    );
    for (let i = 0; i < filteredProduct.length; i++) {
      total += filteredProduct[i].quantity;
    }
    return total;
  }

  getMonthTotalRevenue(month: number): number {
    let total = 0;
    let filteredProduct = this.productpurchases$.filter(
      (purchase: ProductPurchase) =>
        new Date(purchase.date).getMonth() === month
    );
    for (let i = 0; i < filteredProduct.length; i++) {
      total += filteredProduct[i].totalPrice;
    }
    return total;
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

  getMonth(): string[] {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let currentMonth = new Date().getMonth();
    return months.slice(0, currentMonth + 1);
  }

  getMonthSold(): number[] {
    let currentMonth = new Date().getMonth();
    let monthSold: number[] = [];
    for (let i = 0; i <= currentMonth; i++) {
      monthSold.push(this.getMonthTotalSold(i));
    }
    return monthSold;
  }

  getMonthRevenue(): number[] {
    let currentMonth = new Date().getMonth();
    let monthRevenue: number[] = [];
    for (let i = 0; i <= currentMonth; i++) {
      monthRevenue.push(this.getMonthTotalRevenue(i));
    }
    return monthRevenue;
  }

  updateChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    this.lineChartData = {
      labels: this.getMonth(),
      datasets: [
        {
          label: '2024',
          data: this.getMonthSold(),
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4,
        },
        {
          label: '2023',
          data: [5, 4, 8, 3, 13, 17, 24, 21, 25, 19, 14, 20],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          tension: 0.4,
        },
      ],
    };
    this.barChartData = {
      labels: this.getMonth(),
      datasets: [
        {
          label: '2024',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: this.getMonthRevenue(),
        },
        {
          label: '2023',
          backgroundColor: documentStyle.getPropertyValue('--pink-500'),
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          data: [
            5000, 4000, 8000, 3000, 1300, 1700, 2400, 2100, 2500, 1900, 1400,
            2000,
          ],
        },
      ],
    };
    this.donutChartData = {
      label: ['A', 'B'],
      datasets: [
        {
          data: [this.productTotalRevenue, this.allProductRevenue - this.productTotalRevenue],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400'),
          ],
        },
      ],
    };
  }
}
