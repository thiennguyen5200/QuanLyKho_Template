import { Injectable } from '@angular/core';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class JWTService {
    key = 'KomaFasion@ThienNguyen';

    sign(payload){
        try {
            const token = jwt.sign(payload, this.key);
            return token;
        } catch {
            return null;
        }
    }

    verify(token){
        try{
            const decoded = jwt.verify(token, this.key)
            delete decoded.iat
            delete decoded.exp
            return decoded
        }
        catch(err){ 
            throw new Error(err.message)
        }
    }
}
