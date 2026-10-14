import {

Component,

OnInit

} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { ProductFormComponent } from '../product-form/product-form.component';

import { ChangeDetectorRef } from '@angular/core';

import { Product }

from

'../../../../core/models/product.model';

import { ProductAdminService }

from

'../../services/product-admin.service';

@Component({

selector:'app-product-list',

standalone:true,

imports:[

CommonModule,

FormsModule,

ProductFormComponent

],

templateUrl:'./product-list.component.html',

styleUrls:[

'./product-list.component.css'

]

})

export class ProductListComponent

implements OnInit{

selectedProduct:Product|null=null;

products:Product[]=[];

showForm=false;

filteredProducts:Product[]=[];

search='';

constructor(

private productService:

ProductAdminService,
private cdr: ChangeDetectorRef

){}

ngOnInit(){

this.loadProducts();

}

loadProducts(){

this.productService

.getAll()

.subscribe(products=>{

this.products=products;

this.filteredProducts=products;

this.cdr.detectChanges();

});

}

filter(){

const value=

this.search.toLowerCase();

this.filteredProducts=

this.products.filter(p=>

p.nombre

.toLowerCase()

.includes(value)

||

(p.categoria?.nombre||'')

.toLowerCase()

.includes(value)

);

this.cdr.detectChanges();

}

newProduct(){

    this.selectedProduct = null;

    this.showForm = true;

    this.cdr.detectChanges();

}

edit(product: Product){
    console.log(product);
    this.selectedProduct = {
        ...product
    };

    this.showForm = true;

    this.cdr.detectChanges();

}

reload(){

this.showForm=false;

this.loadProducts();

this.loadProducts();

}

}