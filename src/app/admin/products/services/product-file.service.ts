import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class ProductFileService{

    private api='http://localhost:3000/api/products';

    constructor(
        private http:HttpClient
    ){}

    uploadManual(productId:number,file:File):Observable<any>{

        const form=new FormData();

        console.log('POST ->', `${this.api}/${productId}/upload-manual`);
    console.log('Archivo:', file);

        form.append('manual',file);

        return this.http.post(
            `${this.api}/${productId}/upload-manual`,
            form
        );

    }

    uploadDatasheet(productId:number,file:File):Observable<any>{

        const form=new FormData();

        form.append('datasheet',file);

        return this.http.post(
            `${this.api}/${productId}/upload-datasheet`,
            form
        );

    }

}