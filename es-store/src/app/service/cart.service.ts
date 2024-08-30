import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Product } from '../model/product.model';
import { ProductsService } from './products.service';
import { PurchasesService } from './purchases.service';
import { ProductpurchaseService } from './productpurchase.service';
import { Purchase } from '../model/purchase.model';
import { ProductPurchase } from '../model/productpurchase.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Product[] = [];
  private cartSubject: Observable<Product[]> | any = new BehaviorSubject<
    Product[]
  >(this.cart);

  constructor(
    private productService: ProductsService,
    private purchaseService: PurchasesService,
    private productPurchaseService: ProductpurchaseService
  ) {}

  getCart(): Observable<Product[]> {
    return this.cartSubject;
  }

  editProductQuantity(product: Product, quantity: number) {
    const existingProduct = this.cart.find((item) => item._id == product._id);
    if (existingProduct) {
      existingProduct.quantity += quantity;
      if (existingProduct.quantity == 0) {
        this.removeProduct(existingProduct._id);
      }
    } else {
      this.cart.push({ ...product, quantity: quantity });
    }
    this.cartSubject.next(this.cart);
  }

  removeProduct(productId: string): void {
    this.cart = this.cart.filter((product) => product._id != productId);
    this.cartSubject.next(this.cart);
  }

  clearCart(): void {
    this.cart = [];
    this.cartSubject.next(this.cart);
  }

  getProduct(): Product[] {
    return this.cart;
  }

  getCartItemCount(): number {
    let total = 0;
    for (let i = 0; i < this.cart.length; i++) {
      total += this.cart[i].quantity;
    }
    return total;
  }

  getCartTotal(): number {
    return this.cart.reduce(
      (total, product) => total + product.salePrice * product.quantity,
      0
    );
  }

  checkOut() {
    let purchaseId = this.generateUniqueCode();
    let customerId = this.generateUniqueCode();
    let purchase: Purchase = {
      _id: purchaseId,
      customerId: customerId,
      totalPrice: this.getCartTotal(),
      quantity: this.getCartItemCount(),
      date: new Date(),
      status: 'toship',
    };
    this.purchaseService.addPurchase(purchase).subscribe({
      next: (newpurchase) => {
        console.log(`Purchase with id ${newpurchase._id} added successfully.`);
      },
      error: (err) => {
        console.error(`Failed to add purchase with id ${purchaseId}`, err);
      },
    });
    for (let i = 0; i < this.cart.length; i++) {
      let productPurchaseId = this.generateUniqueCode();
      let product: Product;
      this.productService.getProduct(this.cart[i]._id).subscribe((x) => {
        product = x;
        let purchasedQuantity = this.cart[i].quantity;
        let editProduct = {
          _id: product._id,
          name: product.name,
          category: product.category,
          salePrice: product.salePrice,
          description: product.description,
          image: product.image,
          code: product.code,
          rating: product.rating,
          quantity: product.quantity - purchasedQuantity,
          inventoryStatus:
            product.quantity > 10
              ? 'instock'
              : product.quantity <= 10 && product.quantity > 0
              ? 'lowstock'
              : 'outofstock',
          sold: product.sold + purchasedQuantity,
          revenue: product.revenue + product.salePrice * purchasedQuantity,
          brand: product.brand,
        };
        this.productService
          .updateProduct(this.cart[i]._id, editProduct)
          .subscribe({
            next: (updatedProduct) => {
              console.log(
                `Product with id ${editProduct._id} updated successfully.`
              );
              this.removeProduct(editProduct._id);
            },
            error: (err) => {
              console.error(
                `Failed to add product purchase with id ${productPurchaseId}`,
                err
              );
            },
          });
        let productpurchase: ProductPurchase = {
          _id: productPurchaseId,
          purchaseId: purchaseId,
          productCode: product.code,
          quantity: purchasedQuantity,
          pricePerItem: product.salePrice,
          totalPrice: product.salePrice * purchasedQuantity,
          date: new Date(),
        };
        this.productPurchaseService.addProduct(productpurchase).subscribe({
          next: (newproductpurchase) => {
            console.log(
              `Product purchase with id ${newproductpurchase._id} added successfully.`
            );
          },
          error: (err) => {
            console.error(
              `Failed to update product with id ${this.cart[i]._id}`,
              err
            );
          },
        });
      });
    }
  }

  generateUniqueCode(length: number = 8): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    // Optionally, add a timestamp or other unique identifier to ensure uniqueness
    const timestamp = Date.now().toString(); // Convert timestamp to base-36 string
    return `${result}-${timestamp}`;
  }
}
