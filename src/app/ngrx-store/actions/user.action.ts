import { Action } from '@ngrx/store'
import { User, DialogData } from '../models/user.model'

export enum UserActionTypes {
    LOAD_ITEM = '[USER] Load item',
    LOAD_ITEM_SUCCESS = '[USER] Load item success',
    LOAD_ITEM_FAILURE = '[USER] Load item failure',
    ADD_ITEM = '[USER] Add item',
    ADD_ITEM_SUCCESS = '[USER] Add item success',
    ADD_ITEM_FAILURE = '[USER] Add item failure',
    UPDATE_ITEM = '[USER] UPDATE item',
    UPDATE_ITEM_SUCCESS = '[USER] UPDATE item success',
    UPDATE_ITEM_FAILURE = '[USER] UPDATE item failure',
    DELETE_ITEM = '[USER] Delete item',
    DELETE_ITEM_SUCCESS = '[USER] Delete item success',
    DELETE_ITEM_FAILURE = '[USER] Delete item failure'
}
export class LoadUserAction implements Action {
    readonly type = UserActionTypes.LOAD_ITEM;
}

export class LoadUserSuccessAction implements Action {
    readonly type = UserActionTypes.LOAD_ITEM_SUCCESS;
    constructor(public payload: User){}
}

export class LoadUserFailureAction implements Action {
    readonly type = UserActionTypes.LOAD_ITEM_FAILURE;
    constructor(public payload: Error){}
}

export class AddUserAction implements Action {
    readonly type = UserActionTypes.ADD_ITEM;
    constructor(
        public payload: DialogData
    ){}
}
export class AddUserSuccessAction implements Action {
    readonly type = UserActionTypes.ADD_ITEM_SUCCESS;
    constructor(
        public payload: User
    ){}
}
export class AddUserFailureAction implements Action {
    readonly type = UserActionTypes.ADD_ITEM_FAILURE;
    constructor(
        public payload: Error
    ){}
}


export class UpdateUserAction implements Action {
    readonly type = UserActionTypes.UPDATE_ITEM;
    constructor(
        public payload: DialogData
    ){}
}
export class UpdateUserSuccessAction implements Action {
    readonly type = UserActionTypes.UPDATE_ITEM_SUCCESS;
    constructor(
        public payload: User
    ){}
}
export class UpdateUserFailureAction implements Action {
    readonly type = UserActionTypes.UPDATE_ITEM_FAILURE;
    constructor(
        public payload: Error
    ){}
}


export class DeleteUserAction implements Action {
    readonly type = UserActionTypes.DELETE_ITEM;
    constructor(
        public id: string
    ){}
}
export class DeleteUserSuccessAction implements Action {
    readonly type = UserActionTypes.DELETE_ITEM_SUCCESS;
    constructor(
        public payload: User
    ){}
}
export class DeleteUserFailureAction implements Action {
    readonly type = UserActionTypes.DELETE_ITEM_FAILURE;
    constructor(public payload: Error){}
}

export type UserAction = |
LoadUserAction| 
LoadUserSuccessAction|
LoadUserFailureAction|
AddUserAction|
AddUserSuccessAction|
AddUserFailureAction|
UpdateUserAction|
UpdateUserSuccessAction|
UpdateUserFailureAction|
DeleteUserAction|
DeleteUserSuccessAction|
DeleteUserFailureAction;