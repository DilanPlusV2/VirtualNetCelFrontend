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

    selector:'app-product-manual',

    standalone:true,

    imports:[
        CommonModule
    ],

    templateUrl:'./product-manual.component.html',

    styleUrls:[
        './product-manual.component.css'
    ]

})

export class ProductManualComponent{

    @Input()
    productId!:number;

    @Input()
    manual:string|null|undefined=null;

    @Output()
    uploaded = new EventEmitter<string>();

    constructor(

        private service:ProductFileService

    ){}

    select(event:any){

        const file=event.target.files[0];

        if(!file)return;

        this.service

        .uploadManual(

            this.productId,

            file

        )

        .subscribe({

            next:(resp)=>{

                console.log("SUBIDA OK");
                console.log(resp);

                this.manual =
                    resp.product.manual_usuario;

                this.uploaded.emit(
                    resp.product.manual_usuario
                );

            },

            error:(err)=>{

                console.error("ERROR");
                console.error(err);

            }

        });

    }

}