import { Component, Input, ChangeDetectorRef} from '@angular/core';

import { CommonModule } from '@angular/common';

import { ProductImageService }
from '../../services/product-image.service';

@Component({

    selector:'app-product-images',

    standalone:true,

    imports:[CommonModule],

    templateUrl:'./product-images.component.html',

    styleUrls:['./product-images.component.css']

})

export class ProductImagesComponent{

    images:any[]=[];

    private _productId?:number;

    @Input()

    set productId(value:number|undefined){

        console.log("Setter productId =", value);

        this._productId=value;

        if(value){

            this.load();

        }

    }

    get productId(){

        return this._productId;

    }

    constructor(

        private service:ProductImageService,
        private cdr: ChangeDetectorRef

    ){}

    load(){

        console.log("load()", this.productId);

        this.service

        .getImages(this.productId!)

        .subscribe(images=>{

            console.log("Respuesta API", images);

            this.images=images;

            this.cdr.detectChanges();

        });

    }

    select(event:any){

        const file=event.target.files[0];

        if(!file)return;

        this.service

        .upload(this.productId!,file)

        .subscribe(()=>this.load());

    }

    delete(id:number){

        this.service

        .delete(id)

        .subscribe(()=>this.load());

    }

    principal(id:number){

        this.service

        .setPrincipal(id)

        .subscribe(()=>this.load());

    }

}