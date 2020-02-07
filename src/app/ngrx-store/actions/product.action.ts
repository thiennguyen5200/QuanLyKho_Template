import { Action } from '@ngrx/store'
import { Product } from '../models/product.model'

export enum ProductActionTypes {
    LOAD_ITEM = '[PRODUCT] Load item',
    LOAD_ITEM_SUCCESS = '[PRODUCT] Load item success',
    LOAD_ITEM_FAILURE = '[PRODUCT] Load item failure',
    ADD_ITEM = '[PRODUCT] Add item',
    ADD_ITEM_SUCCESS = '[PRODUCT] Add item success',
    ADD_ITEM_FAILURE = '[PRODUCT] Add item failure',
    UPDATE_ITEM = '[PRODUCT] UPDATE item',
    UPDATE_ITEM_SUCCESS = '[PRODUCT] UPDATE item success',
    UPDATE_ITEM_FAILURE = '[PRODUCT] UPDATE item failure',
    UPDATE_ITEM_AMOUNT = '[PRODUCT] UPDATE Amount item',
    UPDATE_ITEM_AMOUNT_SUCCESS = '[PRODUCT] UPDATE Amount item success',
    UPDATE_ITEM_AMOUNT_FAILURE = '[PRODUCT] UPDATE Amount item failure',
    DELETE_ITEM = '[PRODUCT] Delete item',
    DELETE_ITEM_SUCCESS = '[PRODUCT] Delete item success',
    DELETE_ITEM_FAILURE = '[PRODUCT] Delete item failure'
}
export class LoadProductAction implements Action {
    readonly type = ProductActionTypes.LOAD_ITEM;
}

export class LoadProductSuccessAction implements Action {
    readonly type = ProductActionTypes.LOAD_ITEM_SUCCESS;
    constructor(public payload: Product){}
}

export class LoadProductFailureAction implements Action {
    readonly type = ProductActionTypes.LOAD_ITEM_FAILURE;
    constructor(public payload: Error){}
}

export class AddProductAction implements Action {
    readonly type = ProductActionTypes.ADD_ITEM;
    constructor(
        public payload: Product
    ){}
}
export class AddProductSuccessAction implements Action {
    readonly type = ProductActionTypes.ADD_ITEM_SUCCESS;
    constructor(
        public payload: Product
    ){}
}
export class AddProductFailureAction implements Action {
    readonly type = ProductActionTypes.ADD_ITEM_FAILURE;
    constructor(
        public payload: Error
    ){}
}


export class UpdateProductAction implements Action {
    readonly type = ProductActionTypes.UPDATE_ITEM;
    constructor(
        public payload: Product
    ){}
}
export class UpdateProductSuccessAction implements Action {
    readonly type = ProductActionTypes.UPDATE_ITEM_SUCCESS;
    constructor(
        public payload: Product
    ){}
}
export class UpdateProductFailureAction implements Action {
    readonly type = ProductActionTypes.UPDATE_ITEM_FAILURE;
    constructor(
        public payload: Error
    ){}
}

export class UpdateAmountAction implements Action {
    readonly type = ProductActionTypes.UPDATE_ITEM_AMOUNT;
    constructor(
        public payload: Product
    ){}
}
export class UpdateAmountSuccessAction implements Action {
    readonly type = ProductActionTypes.UPDATE_ITEM_AMOUNT_SUCCESS;
    constructor(
        public payload: Product
    ){}
}
export class UpdateAmountFailureAction implements Action {
    readonly type = ProductActionTypes.UPDATE_ITEM_AMOUNT_FAILURE;
    constructor(
        public payload: Error
    ){}
}


export class DeleteProductAction implements Action {
    readonly type = ProductActionTypes.DELETE_ITEM;
    constructor(
        public id: string
    ){}
}
export class DeleteProductSuccessAction implements Action {
    readonly type = ProductActionTypes.DELETE_ITEM_SUCCESS;
    constructor(
        public payload: Product
    ){}
}
export class DeleteProductFailureAction implements Action {
    readonly type = ProductActionTypes.DELETE_ITEM_FAILURE;
    constructor(public payload: Error){}
}

export type ProductAction = |
LoadProductAction| 
LoadProductSuccessAction|
LoadProductFailureAction|
AddProductAction|
AddProductSuccessAction|
AddProductFailureAction|
UpdateProductAction|
UpdateProductSuccessAction|
UpdateProductFailureAction|
UpdateAmountAction|
UpdateAmountSuccessAction|
UpdateAmountFailureAction|
DeleteProductAction|
DeleteProductSuccessAction|
DeleteProductFailureAction;