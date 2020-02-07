import { User } from './user.model';
import { UserState, AccountState } from '../reducers/user.reducer';
import { ProductState } from '../reducers/product.reducer';

export interface AppState{
    readonly user: UserState,
    readonly account: AccountState,
    readonly product: ProductState
};