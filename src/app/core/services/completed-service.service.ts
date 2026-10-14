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
    CompletedService
} from '../models/completed-service.model';

@Injectable({

    providedIn:'root'

})

export class CompletedServiceService{

    private api='http://localhost:3000/api/completed-services';

    constructor(

        private http:HttpClient

    ){}

    getAll():Observable<CompletedService[]>{

        return this.http.get<CompletedService[]>(

            this.api

        );

    }

    getById(

        id:number

    ):Observable<CompletedService>{

        return this.http.get<CompletedService>(

            `${this.api}/${id}`

        );

    }

    create(

        service:CompletedService

    ){

        return this.http.post(

            this.api,

            service

        );

    }

    update(

        id:number,

        service:CompletedService

    ){

        return this.http.put(

            `${this.api}/${id}`,

            service

        );

    }

    delete(id:number){

        return this.http.delete(

            `${this.api}/${id}`

        );

    }

}