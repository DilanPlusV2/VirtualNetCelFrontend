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
    BlogReference
} from '../models/blog-reference.model';

@Injectable({

    providedIn:'root'

})

export class BlogReferenceService{

    private api='http://localhost:3000/api/blog-references';

    constructor(

        private http:HttpClient

    ){}

    getByBlog(

        blogId:number

    ):Observable<BlogReference[]>{

        return this.http.get<BlogReference[]>(

            `${this.api}/blog/${blogId}`

        );

    }

    create(

        reference:BlogReference

    ){

        return this.http.post(

            this.api,

            reference

        );

    }

    update(

        id:number,

        reference:BlogReference

    ){

        return this.http.put(

            `${this.api}/${id}`,

            reference

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