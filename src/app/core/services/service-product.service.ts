import {
    Injectable
} from '@angular/core';

import {
    HttpClient
} from '@angular/common/http';

import {
    Observable
} from 'rxjs';

import {
    ServiceProduct
} from '../models/service-product.model';

@Injectable({

    providedIn:'root'

})

export class ServiceProductService{

    private api='http://localhost:3000/api/service-products';

    constructor(

        private http:HttpClient

    ){}

    getByCompletedService(

        completedServiceId:number

    ):Observable<ServiceProduct[]>{

        return this.http.get<ServiceProduct[]>(

            `${this.api}/completed-service/${completedServiceId}`

        );

    }

    create(

        relation:ServiceProduct

    ){

        return this.http.post(

            this.api,

            relation

        );

    }

    update(

        id:number,

        relation:ServiceProduct

    ){

        return this.http.put(

            `${this.api}/${id}`,

            relation

        );

    }

    delete(id:number){

        return this.http.delete(

            `${this.api}/${id}`

        );

    }

}