import { Component } from '@angular/core';

import { ProductListComponent }

from

'../components/product-list/product-list.component';

@Component({

standalone:true,

imports:[

ProductListComponent

],

templateUrl:'./products.component.html',

styleUrls:[

'./products.component.css'

]

})

export class ProductsComponent{

}