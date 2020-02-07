import { Action } from '@ngrx/store'
import { User } from '../models/user.model'

export enum AccountActionTypes {
    ADD_ITEM = '[ACCOUNT] Add item',
    ADD_ITEM_SUCCESS = '[ACCOUNT] Add item success',
    ADD_ITEM_FAILURE = '[ACCOUNT] Add item FAIL',
    DELETE_ITEM = '[ACCOUNT] Delete item',
    DELETE_ITEM_SUCCESS = '[ACCOUNT] Delete item success',
    DELETE_ITEM_FAILURE = '[ACCOUNT] Delete item failure'
}

export class AddAccountAction implements Action {
    readonly type = AccountActionTypes.ADD_ITEM;
    constructor(
        public username: string,
        public password: string
    ){}
}

export class AddAccountSuccessAction implements Action {
    readonly type = AccountActionTypes.ADD_ITEM_SUCCESS;
    constructor(
        public payload: User
    ){}
}
export class AddAccountFailureAction implements Action {
    readonly type = AccountActionTypes.ADD_ITEM_FAILURE;
    constructor(
        public payload: Error
    ){}
}

export class DeleteAccountAction implements Action {
    readonly type = AccountActionTypes.DELETE_ITEM;
}

export class DeleteAccountSuccessAction implements Action {
    readonly type = AccountActionTypes.DELETE_ITEM_SUCCESS;
    constructor(
        public payload: User
    ){}
}
export class DeleteAccountFailureAction implements Action {
    readonly type = AccountActionTypes.DELETE_ITEM_FAILURE;
    constructor(public payload: Error){}
}
export type AccountAction = 
AddAccountAction | 
AddAccountSuccessAction |
AddAccountFailureAction |
DeleteAccountAction |
DeleteAccountSuccessAction |
DeleteAccountFailureAction;