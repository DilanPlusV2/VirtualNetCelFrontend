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
    BlogImage
} from '../models/blog-image.model';

@Injectable({

    providedIn:'root'

})

export class BlogImageService{

    private api='http://localhost:3000/api/blog-images';

    constructor(

        private http:HttpClient

    ){}

    getByBlog(

        blogId:number

    ):Observable<BlogImage[]>{

        return this.http.get<BlogImage[]>(

            `${this.api}/blog/${blogId}`

        );

    }

    create(

        image:BlogImage,

        file:File

    ){

        const formData=new FormData();

        formData.append(

            'blog_id',

            image.blog_id.toString()

        );

        formData.append(

            'titulo_imagen',

            image.titulo_imagen

        );

        formData.append(

            'descripcion',

            image.descripcion

        );

        formData.append(

            'orden',

            image.orden.toString()

        );

        formData.append(

            'blog_image',

            file

        );

        return this.http.post(

            this.api,

            formData

        );

    }

    update(

        id:number,

        image:BlogImage

    ){

        return this.http.put(

            `${this.api}/${id}`,

            image

        );

    }

    uploadImage(

        id:number,

        file:File

    ){

        const formData=new FormData();

        formData.append(

            'blog_image',

            file

        );

        return this.http.put(

            `${this.api}/${id}/image`,

            formData

        );

    }

    delete(

        id:number

    ){

        return this.http.delete(

            `${this.api}/${id}`

        );

    }

}