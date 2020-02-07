import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { LoadUserAction, UserActionTypes, LoadUserSuccessAction, LoadUserFailureAction, UpdateUserAction, UpdateUserSuccessAction, UpdateUserFailureAction, DeleteUserAction, DeleteUserSuccessAction, DeleteUserFailureAction, AddUserAction, AddUserSuccessAction, AddUserFailureAction } from '../actions/user.action';
import { mergeMap, switchMap, map, catchError} from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';
import { ServerResponse } from '../models/types.model';
@Injectable()
export class UserEffect {

    @Effect() loadUser$ = this.actions$
    .pipe(
        ofType<LoadUserAction>(UserActionTypes.LOAD_ITEM),
        mergeMap(() => this.userService.getAllUser()
            .then(data => {
                console.log('Loading Effects')
                return new LoadUserSuccessAction(data)
            })
            .catch(err => of(new LoadUserFailureAction(err)))
        )
    )
    @Effect() updateUser$ = this.actions$
    .pipe(
        ofType<UpdateUserAction>(UserActionTypes.UPDATE_ITEM),
        mergeMap(data => this.userService.updateUser(
                data.payload.id, 
                data.payload.name, 
                data.payload.email, 
                data.payload.phone,
                data.payload.status
            ).pipe(
                map(data => new UpdateUserSuccessAction(data)),
                catchError(err => {
                    return of(new UpdateUserFailureAction(err))
                })
            ),
        ),
    );

    @Effect() createUser$ = this.actions$
    .pipe(
        ofType<AddUserAction>(UserActionTypes.ADD_ITEM),
        mergeMap(data => this.userService.createUser(
                data.payload.account, 
                data.payload.name,
                data.payload.pass,
                data.payload.email, 
                data.payload.phone
            ).pipe(
                map((data: ServerResponse) => {
                    if(data.code === 1){
                        return new AddUserSuccessAction(data.data)
                    } else {
                        throw new Error(data.message);
                    }
                }),
                catchError(err => {
                    console.log(err)
                    return of(new AddUserFailureAction(err))
                })
            ),
        ),
    );

    @Effect() deleteUser$ = this.actions$
    .pipe(
        ofType<DeleteUserAction>(UserActionTypes.DELETE_ITEM),
        mergeMap(data => this.userService.deleteUser(
                data.id
            ).pipe(
                map((data: ServerResponse) => {
                    if(data.code === 1) {
                        return new DeleteUserSuccessAction(data.data);
                    } else {
                        console.log('data')
                        console.log(data)
                        throw new Error(data.message);
                    }
                }),
                catchError(err => {
                    console.log('catchError')
                    console.log(err)
                    return of(new DeleteUserFailureAction(err))
                })
            ),
        ),
    );

    constructor(
        private actions$: Actions,
        private userService: UserService,
    ){

    }
}