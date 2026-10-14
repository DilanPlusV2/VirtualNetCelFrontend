import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { InventoryMovement } from '../models/inventory.model';

@Injectable({

    providedIn:'root'

})

export class InventoryService{

    private api='http://localhost:3000/api/inventory';

    constructor(

        private http:HttpClient

    ){}

    create(

        data:InventoryMovement

    ):Observable<any>{

        return this.http.post(

            this.api,

            data

        );

    }

    history(

        productId:number

    ):Observable<InventoryMovement[]>{

        return this.http.get<InventoryMovement[]>(

            `${this.api}/product/${productId}`

        );

    }

}