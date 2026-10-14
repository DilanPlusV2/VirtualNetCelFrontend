import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Product } from '../../../core/models/product.model';

@Injectable({

providedIn:'root'

})

export class ProductAdminService{

private http=inject(HttpClient);

private api='http://localhost:3000/api/products';

getAll():Observable<Product[]>{

return this.http.get<Product[]>(

this.api

);

}

getById(id:number){

return this.http.get<Product>(

`${this.api}/${id}`

);

}

create(product:Product){

return this.http.post(

this.api,

product

);

}

update(

id:number,

product:Product

){

return this.http.put(

`${this.api}/${id}`,

product

);

}

delete(id:number){

return this.http.delete(

`${this.api}/${id}`

);

}

}