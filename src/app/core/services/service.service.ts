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
    Service
} from '../models/service.model';

import { map } from 'rxjs/operators';

@Injectable({

    providedIn:'root'

})

export class ServiceService{

    private api='http://localhost:3000/api/services';

    constructor(

        private http:HttpClient

    ){}

    getAll(): Observable<Service[]> {

    return this.http
        .get<Service[]>(this.api)
        .pipe(

            map(services =>

                services.map(service => ({

                    ...service,

                    es_mantenimiento:
                        service.tipo === 'MANTENIMIENTO'

                }))

            )

        );

}

    getById(id:number):Observable<Service>{

    return this.http
        .get<Service>(`${this.api}/${id}`)
        .pipe(

            map(service => ({

                ...service,

                es_mantenimiento:
                    service.tipo === 'MANTENIMIENTO'

            }))

        );

}

    create(service:Service){

        return this.http.post(

            this.api,

            {

                nombre:service.nombre,

                descripcion:service.descripcion,

                es_mantenimiento:
                    service.es_mantenimiento,

                precio_base:
                    service.precio_base,

                activo:
                    service.activo

            }

        );

    }

    update(id:number,service:Service){

        return this.http.put(

            `${this.api}/${id}`,

            {

                nombre:service.nombre,

                descripcion:service.descripcion,

                es_mantenimiento:
                service.es_mantenimiento,

                precio_base:
                    service.precio_base,

                activo:
                    service.activo

            }

        );

    }

    delete(id:number){

        return this.http.delete(

            `${this.api}/${id}`

        );

    }

}