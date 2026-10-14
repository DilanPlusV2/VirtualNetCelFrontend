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
    ServiceImage
} from '../models/service-image.model';

@Injectable({

    providedIn:'root'

})

export class ServiceImageService{

    private api='http://localhost:3000/api/service-images';

    constructor(

        private http:HttpClient

    ){}

    getByService(

        serviceId:number

    ):Observable<ServiceImage[]>{

        return this.http.get<ServiceImage[]>(

            `${this.api}/service/${serviceId}`

        );

    }

    create(

        image:ServiceImage,

        file:File

    ){

        const formData=new FormData();

        formData.append(

            'servicio_id',

            image.servicio_id.toString()

        );

        formData.append(

            'titulo',

            image.titulo

        );

        formData.append(

            'descripcion',

            image.descripcion

        );

        formData.append(

            'principal',

            String(image.principal)

        );

        formData.append(

            'service_image',

            file

        );

        return this.http.post(

            this.api,

            formData

        );

    }

    update(

        id:number,

        image:ServiceImage

    ){

        return this.http.put(

            `${this.api}/${id}`,

            {

                titulo:image.titulo,

                descripcion:image.descripcion,

                principal:image.principal

            }

        );

    }

    uploadImage(

        id:number,

        file:File

    ){

        const formData=new FormData();

        formData.append(

            'service_image',

            file

        );

        return this.http.put(

            `${this.api}/${id}/image`,

            formData

        );

    }

    delete(id:number){

        return this.http.delete(

            `${this.api}/${id}`

        );

    }

}