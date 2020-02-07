import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError} from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';
import { AddAccountAction, AccountActionTypes, AddAccountSuccessAction, AddAccountFailureAction } from '../actions/account.action';
import { ServerResponse } from '../models/types.model';
import { User } from '../models/user.model';
import { JWTService } from 'src/app/services/JWTService';
import { Router } from '@angular/router';
@Injectable()
export class AccountEffect {
    @Effect() LoginAccount$ = this.actions$
    .pipe(
        ofType<AddAccountAction>(AccountActionTypes.ADD_ITEM),
        mergeMap(data => this.userService.signIn(
                data.username,
                data.password
            ).pipe(
                map((result:ServerResponse) => {
                    if(result.code === 1){
                        const user: User = this.jwtService.verify(result.data.user);
                        if(user.status === false){
                            throw new Error('Bạn không có quyền đăng nhập');
                        } else {
                            localStorage.setItem('_token',result.data.token);
                            localStorage.setItem('_account',result.data.user);
                            this.router.navigate(['']);
                            return new AddAccountSuccessAction(user)
                        }
                    } else {
                        throw new Error(result.message);
                    }
                }),
                catchError(err => of(new AddAccountFailureAction(err)))
            ),
        ),
    );

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private jwtService: JWTService,
        private router: Router,
    ){

    }
}