import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, switchMap, map, catchError, tap, takeUntil } from 'rxjs';
import { ProductsService } from '../../service/products.service';
import * as ProductsActions from './products.actions';

@Injectable()
export class ProductsEffects {
  constructor(
    private action$: Actions<any>,
    private productService: ProductsService
  ) {}

  fetchProducts$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProductsActions.appLoaded),
      switchMap(() =>
        this.productService.getProducts().pipe(
          map((products) =>
            ProductsActions.fetchProductSuccess({ products: products })
          ),
          catchError((err) =>
            of(ProductsActions.fetchProductFailed({ error: err }))
          )
        )
      ),
      takeUntil(this.action$.pipe(ofType(ProductsActions.fetchProductSuccess)))
    )
  );

  addProduct$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProductsActions.addProductFormSubmitted.type),
      switchMap((action) =>
        this.productService.addProduct(action.product).pipe(
          map(() =>
            ProductsActions.addProductSuccess({ product: action.product })
          ),
          catchError((error) =>
            of(ProductsActions.addProductFailed({ error: error }))
          )
        )
      )
    )
  );

  editProduct$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProductsActions.editProductFormSubmitted.type),
      switchMap((action) =>
        this.productService
          .updateProduct(action.product._id, action.product)
          .pipe(
            map(() =>
              ProductsActions.editProductSuccess({ product: action.product })
            ),
            catchError((error) =>
              of(ProductsActions.editProductFailed({ error: error }))
            )
          )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProductsActions.deleteProductInitiated.type),
      switchMap((action) =>
        this.productService.deleteProduct(action.productId).pipe(
          map(() =>
            ProductsActions.deleteProductSuccess({
              productId: action.productId,
            })
          ),
          catchError((error) =>
            of(ProductsActions.deleteProductFailed({ error: error }))
          )
        )
      )
    )
  );
}
