import {
    HttpClient
} from '@angular/common/http';

import {
    Injectable
} from '@angular/core';

import {
    Observable
} from 'rxjs';

import {
    Blog
} from '../models/blog.model';

@Injectable({

    providedIn:'root'

})

export class BlogService{

    private api='http://localhost:3000/api/blog';

    constructor(

        private http:HttpClient

    ){}

    getAll():Observable<Blog[]>{

        return this.http.get<Blog[]>(this.api);

    }

    create(blog:Blog):Observable<Blog>{

        return this.http.post<Blog>(

            this.api,

            blog

        );

    }

    update(

        id:number,

        blog:Blog

    ):Observable<Blog>{

        return this.http.put<Blog>(

            `${this.api}/${id}`,

            blog

        );

    }

    delete(

        id:number

    ){

        return this.http.delete(

            `${this.api}/${id}`

        );

    }

    uploadBanner(

        id:number,

        file:File

    ){

        const formData=new FormData();

        formData.append(

            'blog_banner',

            file

        );

        return this.http.post(

            `${this.api}/${id}/banner`,

            formData

        );

    }

}
