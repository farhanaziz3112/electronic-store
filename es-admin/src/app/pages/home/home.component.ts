import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductsService } from '../../service/products.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatDialogModule,
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Product } from '../../model/product.model';
import { deleteProductInitiated, selectProduct } from '../../state/products';
import { Dialog } from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import { selectUserDetails } from '../../state/user';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { SplitterModule } from 'primeng/splitter';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';

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
  MenubarModule,
  RippleModule,
  InputTextModule,
  AvatarModule,
  BadgeModule,
  ButtonModule,
  SplitterModule,
  CardModule,
  MenuModule,
  TableModule,
  StyleClassModule,
  PanelMenuModule,
  ButtonModule,
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, matDesignModules],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  products$: Observable<any> | any;
  allproducts$ = this.store.select(selectProduct);
  user$: Observable<any> | any;

  constructor(
    public auth: AuthService,
    private store: Store<any>,
    private productService: ProductsService,
    private router: Router
  ) {
    //this.allproducts$ = this.store.select(selectProduct);
    // this.productService.getProducts().subscribe( products => {
    //   this.products$ = products
    // } )
    //this.products$ = this.productService.getProducts();
    this.store.select(selectUserDetails).subscribe((user) => {
      this.user$ = user;
    });
  }

  ngOnInit(): void {}

  readonly dialog = inject(MatDialog);
  openDeleteDialog(product: Product): void {
    const dialogRef = this.dialog.open(DialogOverview, {
      data: {
        name: product.name,
        id: product._id,
      },
    });
    dialogRef.afterClosed();
  }

  // deleteProduct(id: string) {
  //   this.productService.deleteProduct(id).subscribe((x) => {
  //     console.log(x);
  //     this.store.dispatch(deleteProductInitiated({ productId: id }));
  //   });
  // }

  addProduct(): void {
    this.router.navigate(['/addproduct']);
  }

  editProduct(id: string): void {
    this.router.navigate(['/editproduct', id]);
  }
}

@Component({
  selector: 'dialog-overview',
  template: `<h2 mat-dialog-title>Delete Confirmation</h2>
    <mat-dialog-content>
      <p>Are sure you want to delete this product:</p>
      <h2>{{ data.name }}</h2>
    </mat-dialog-content>

    <mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button cdkFocusInitial (click)="onYesClick(data.id)">
        Confirm
      </button>
    </mat-dialog-actions>`,
  standalone: true,
  imports: [matDesignModules, HomeComponent],
})
export class DialogOverview {
  readonly dialogRef = inject(MatDialogRef<DialogOverview>);
  readonly data = inject<dialogData>(MAT_DIALOG_DATA);

  constructor(private productService: ProductsService, private store: Store) {}

  onYesClick(id: string): void {
    // this.productService.deleteProduct(id).subscribe(x => {
    //   console.log('delete' + id);
    // });
    this.store.dispatch(
      deleteProductInitiated({
        productId: id,
      })
    );
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface dialogData {
  name: string;
  id: string;
}
