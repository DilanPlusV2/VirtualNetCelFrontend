import {
    Component,
    Input,
    Output,
    EventEmitter
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { ProductFileService }
from '../../services/product-file.service';

@Component({

    selector:'app-product-datasheet',

    standalone:true,

    imports:[
        CommonModule
    ],

    templateUrl:'./product-datasheet.component.html',

    styleUrls:[
        './product-datasheet.component.css'
    ]

})

export class ProductDatasheetComponent{

    @Input()
    productId!:number;

    @Input()
    datasheet:string|null|undefined=null;

    @Output()
    uploaded = new EventEmitter<string>();

    constructor(

        private service:ProductFileService

    ){}

    select(event:any){

        const file=event.target.files[0];

        if(!file)return;

        this.service

        .uploadDatasheet(

            this.productId,

            file

        )

        .subscribe({

            next:(resp)=>{

                console.log("SUBIDA OK");
                console.log(resp);

                this.datasheet =
                    resp.product.ficha_tecnica;

                this.uploaded.emit(
                    resp.product.ficha_tecnica
                );

            },

            error:(err)=>{

                console.error("ERROR");
                console.error(err);

            }

        });

    }

}