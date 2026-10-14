import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({

providedIn:'root'

})

export class ProductImageService{

private http=inject(HttpClient);

private api='http://localhost:3000/api/product-photos';

getImages(productId:number){

return this.http.get<any[]>(

`${this.api}/product/${productId}`

);

}

upload(

productId:number,

file:File,

principal=false

){

const form=new FormData();

form.append(
    'image',
    file
);

form.append(
    'producto_id',
    String(productId)
);

form.append(
    'principal',
    String(principal)
);

return this.http.post(

`${this.api}/upload-image`,

form

);

}

delete(id:number){

return this.http.delete(

`${this.api}/${id}`

);

}

setPrincipal(id:number){

return this.http.put(

`${this.api}/${id}/principal`,

{}

);

}

}