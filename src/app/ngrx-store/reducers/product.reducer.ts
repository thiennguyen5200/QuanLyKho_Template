import { Product } from '../models/product.model'
import { ProductAction, ProductActionTypes } from '../actions/product.action'

export interface ProductState{
    list: Array<Product>,
    loading: boolean,
    error: Error
}

const initialState: ProductState = {
    list: null,
    loading: false,
    error: undefined
}

export function ProductReducer(state: ProductState = initialState, action: ProductAction){
    switch (action.type){
        case ProductActionTypes.LOAD_ITEM:
            return {...state,loading:true}
        case ProductActionTypes.LOAD_ITEM_SUCCESS:
            return {
                ...state,
                list: action.payload, 
                loading: false
            };
        case ProductActionTypes.LOAD_ITEM_FAILURE:
            return {
                ...state,
                error: action.payload, 
                loading: false
            };

        case ProductActionTypes.ADD_ITEM:
                return {...state,loading:true}
        case ProductActionTypes.ADD_ITEM_SUCCESS:
            return {
                ...state,
                list: [...state.list ,action.payload], 
                loading: false
            };
        case ProductActionTypes.ADD_ITEM_FAILURE:
            return {
                ...state,
                error: action.payload, 
                loading: false
            };

        case ProductActionTypes.UPDATE_ITEM:
            return {...state,loading:true}
        case ProductActionTypes.UPDATE_ITEM_SUCCESS:
            return {
                ...state,
                list: state.list.map(product => {
                    if(product._id === action.payload._id){
                        
                        return product = action.payload
                    }
                    return product;
                }), 
                loading: false
            };
        case ProductActionTypes.UPDATE_ITEM_FAILURE:
            return {
                ...state,
                error: action.payload, 
                loading: false
            };

        case ProductActionTypes.UPDATE_ITEM_AMOUNT:
            return {...state,loading:true}
        case ProductActionTypes.UPDATE_ITEM_AMOUNT_SUCCESS:
            return {
                ...state,
                list: state.list.map(product => {
                    if(product._id === action.payload._id){
                        
                        return product = action.payload
                    }
                    return product;
                }), 
                loading: false
            };
        case ProductActionTypes.UPDATE_ITEM_AMOUNT_FAILURE:
            return {
                ...state,
                error: action.payload, 
                loading: false
            };
        
        case ProductActionTypes.DELETE_ITEM:
            return {...state,loading:true}
        case ProductActionTypes.DELETE_ITEM_SUCCESS:
            return {
                ...state,
                list: state.list.filter(item => item._id !== action.payload._id), 
                loading: false
            };
        case ProductActionTypes.DELETE_ITEM_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
}