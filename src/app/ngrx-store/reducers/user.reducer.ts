import { User } from '../models/user.model'
import { UserAction, UserActionTypes } from '../actions/user.action'
import { AccountAction, AccountActionTypes } from '../actions/account.action';

export interface UserState{
    list: Array<User>,
    loading: boolean,
    error: Error
}

const initialState: UserState = {
    list: null,
    loading: false,
    error: undefined
}

export interface AccountState{
    list: User,
    loading: boolean,
    error: Error
}

const initialStateAccount: AccountState = {
    list: null,
    loading: false,
    error: undefined
}

export function AccountReducer(state: AccountState = initialStateAccount, action: AccountAction){
    switch (action.type){
        case AccountActionTypes.ADD_ITEM:
            return {
                state,
                loading: true
            };
        case AccountActionTypes.ADD_ITEM_SUCCESS:
            return {
                state,
                list: action.payload,
                loading: false
            }
        case AccountActionTypes.ADD_ITEM_FAILURE:
            return {
                state,
                error: action.payload,
                loading: false
            }
        case AccountActionTypes.DELETE_ITEM:
            return {...state,loading:true}
        case AccountActionTypes.DELETE_ITEM_SUCCESS:
            return {
                state,
                list: null, 
                loading: false
            };
        case AccountActionTypes.DELETE_ITEM_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
}

export function UserReducer(state: UserState = initialState, action: UserAction){
    switch (action.type){
        case UserActionTypes.LOAD_ITEM:
            return {...state,loading:true}
        case UserActionTypes.LOAD_ITEM_SUCCESS:
            return {
                ...state,
                list: action.payload, 
                loading: false
            };
        case UserActionTypes.LOAD_ITEM_FAILURE:
            return {
                ...state,
                error: action.payload, 
                loading: false
            };

        case UserActionTypes.ADD_ITEM:
                return {...state,loading:true}
        case UserActionTypes.ADD_ITEM_SUCCESS:
            return {
                ...state,
                list: [...state.list ,action.payload], 
                loading: false
            };
        case UserActionTypes.ADD_ITEM_FAILURE:
            return {
                ...state,
                error: action.payload, 
                loading: false
            };

        case UserActionTypes.UPDATE_ITEM:
            return {...state,loading:true}
        case UserActionTypes.UPDATE_ITEM_SUCCESS:
            return {
                ...state,
                list: state.list.map(user => {
                    if(user._id === action.payload._id){
                        
                        return user = action.payload
                    }
                    return user;
                }), 
                loading: false
            };
        case UserActionTypes.UPDATE_ITEM_FAILURE:
            return {
                ...state,
                error: action.payload, 
                loading: false
            };


        
        case UserActionTypes.DELETE_ITEM:
            return {...state,loading:true}
        case UserActionTypes.DELETE_ITEM_SUCCESS:
            return {
                ...state,
                list: state.list.filter(item => item._id !== action.payload._id), 
                loading: false
            };
        case UserActionTypes.DELETE_ITEM_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
}