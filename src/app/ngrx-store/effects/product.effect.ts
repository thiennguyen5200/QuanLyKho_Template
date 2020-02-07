import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { LoadProductAction, ProductActionTypes, LoadProductSuccessAction, LoadProductFailureAction, UpdateProductAction, UpdateProductSuccessAction, UpdateProductFailureAction, DeleteProductAction, DeleteProductSuccessAction, DeleteProductFailureAction, AddProductAction, AddProductSuccessAction, AddProductFailureAction, UpdateAmountSuccessAction, UpdateAmountFailureAction, UpdateAmountAction } from '../actions/product.action';
import { mergeMap, map, catchError} from 'rxjs/operators';
import { of } from 'rxjs';
import { ServerResponse } from '../models/types.model';
import { ProductService } from 'src/app/services/product.service';
@Injectable()

export class ProductEffect {

    @Effect() loadProduct$ = this.actions$
    .pipe(
        ofType<LoadProductAction>(ProductActionTypes.LOAD_ITEM),
        mergeMap(() => this.productService.getAllProduct()
            .then(data => {
                return new LoadProductSuccessAction(data)
            })
            .catch(err => of(new LoadProductFailureAction(err)))
        )
    )
    @Effect() updateProduct$ = this.actions$
    .pipe(
        ofType<UpdateProductAction>(ProductActionTypes.UPDATE_ITEM),
        mergeMap(data => this.productService.updateProductName(
                data.payload._id, 
                data.payload.product_name, 
                data.payload.amount
            ).pipe(
                map((result: ServerResponse) => {
                    if(result.code === 1){
                        return new UpdateProductSuccessAction(result.data)
                    } else {
                        const err = new Error(result.message)
                        console.log(err)
                        return new UpdateProductFailureAction(err)
                    }
                }),
                catchError(err => {
                    return of(new UpdateProductFailureAction(err))
                })
            ),
        ),
    );

    @Effect() updateAmount$ = this.actions$
    .pipe(
        ofType<UpdateAmountAction>(ProductActionTypes.UPDATE_ITEM_AMOUNT),
        mergeMap(data => this.productService.updateProductAmount(
                data.payload._id, 
                data.payload.amount
            ).pipe(
                map((result: ServerResponse) => {
                    if(result.code === 1){
                        return new UpdateAmountSuccessAction(result.data)
                    } else {
                        const err = new Error(result.message)
                        console.log(err)
                        return new UpdateAmountFailureAction(err)
                    }
                }),
                catchError(err => {
                    return of(new UpdateAmountFailureAction(err))
                })
            ),
        ),
    );

    // @Effect() updateProductAmount$ = this.actions$
    // .pipe(
    //     ofType<UpdateProductAction>(ProductActionTypes.UPDATE_ITEM),
    //     mergeMap(data => this.productService.updateProductAmount(
    //             data.payload._id,
    //             data.payload.amount
    //         ).pipe(
    //             map(data => new UpdateProductSuccessAction(data)),
    //             catchError(err => {
    //                 return of(new UpdateProductFailureAction(err))
    //             })
    //         ),
    //     ),
    // );

    @Effect() createProduct$ = this.actions$
    .pipe(
        ofType<AddProductAction>(ProductActionTypes.ADD_ITEM),
        mergeMap(data => this.productService.createProduct(
                data.payload.product_name, 
                data.payload.amount
            ).pipe(
                map((data: ServerResponse) => {
                    if(data.code === 1){
                        return new AddProductSuccessAction(data.data)
                    } else {
                        throw new Error(data.message);
                    }
                }),
                catchError(err => {
                    return of(new AddProductFailureAction(err))
                })
            ),
        ),
    );

    @Effect() deleteProduct$ = this.actions$
    .pipe(
        ofType<DeleteProductAction>(ProductActionTypes.DELETE_ITEM),
        mergeMap(data => this.productService.deleteProduct(
                data.id
            ).pipe(
                map((data: ServerResponse) => {
                    if(data.code === 1) {
                        return new DeleteProductSuccessAction(data.data);
                    } else {
                        throw new Error(data.message);
                    }
                }),
                catchError(err => {
                    return of(new DeleteProductFailureAction(err))
                })
            ),
        ),
    );

    constructor(
        private actions$: Actions,
        private productService: ProductService ,
    ){

    }
}