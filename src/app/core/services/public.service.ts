import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PublicService {

    private api = `http://localhost:3000/api/public`;

    constructor(
        private http: HttpClient
    ){}

    home(): Observable<any> {

        return this.http.get(`${this.api}/home`);

    }

    products(): Observable<any> {

        return this.http.get(`${this.api}/products`);

    }

    product(id:number): Observable<any>{

        return this.http.get(`${this.api}/products/${id}`);

    }

    services(): Observable<any>{

        return this.http.get(`${this.api}/services`);

    }

    service(id:number): Observable<any>{

        return this.http.get(`${this.api}/services/${id}`);

    }

    blogs(): Observable<any>{

        return this.http.get(`${this.api}/blog`);

    }

    blogDetail(slug:string):Observable<any>{

        return this.http.get(`${this.api}/blog/${slug}`);

    }

}