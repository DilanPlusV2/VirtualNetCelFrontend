import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Category } from '../models/category.model';

@Injectable({

    providedIn:'root'

})

export class CategoryService{

    private http=inject(HttpClient);

    private api='http://localhost:3000/api/categories';

    getAll():Observable<Category[]>{

        return this.http.get<Category[]>(

            this.api

        );

    }

    getById(id:number):Observable<Category>{

        return this.http.get<Category>(

            `${this.api}/${id}`

        );

    }

    create(category:Category):Observable<any>{

        return this.http.post(

            this.api,

            category

        );

    }

    update(

        id:number,

        category:Category

    ):Observable<any>{

        return this.http.put(

            `${this.api}/${id}`,

            category

        );

    }

    delete(id:number):Observable<any>{

        return this.http.delete(

            `${this.api}/${id}`

        );

    }

}