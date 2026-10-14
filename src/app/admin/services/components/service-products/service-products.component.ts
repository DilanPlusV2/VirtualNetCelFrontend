import {

    Component,

    Input,

    Output,

    EventEmitter,

    OnChanges,

    SimpleChanges,

    ChangeDetectorRef

} from '@angular/core';

import {

    CommonModule

} from '@angular/common';

import {

    FormsModule

} from '@angular/forms';

import {

    ServiceProduct

} from '../../../../core/models/service-product.model';

import {

    Product

} from '../../../../core/models/product.model';

import {

    ServiceProductService

} from '../../../../core/services/service-product.service';

import {

    ProductAdminService

} from '../../../products/services/product-admin.service';

@Component({

    selector:'app-service-products',

    standalone:true,

    imports:[

        CommonModule,

        FormsModule

    ],

    templateUrl:'./service-products.component.html',

    styleUrls:[

        './service-products.component.css'

    ]

})

export class ServiceProductsComponent
implements OnChanges{

    @Input()

    show=false;

    @Input()

    completedServiceId!:number;

    @Output()

    close=new EventEmitter<void>();

    products:Product[]=[];

    relations:ServiceProduct[]=[];

    editing=false;

    selectedId:number|null=null;

    form:ServiceProduct={

        servicio_realizado_id:0,

        producto_id:0,

        cantidad_utilizada:1

    };

    constructor(

        private service:

        ServiceProductService,

        private productAdminService:

        ProductAdminService,

        private cdr:

        ChangeDetectorRef

    ){}

    ngOnChanges(changes:SimpleChanges){

        if(

            changes['show']

            &&

            this.show

        ){

            this.newRelation();

            this.loadProducts();

            this.load();

        }

    }

    load(){

        this.service

        .getByCompletedService(

            this.completedServiceId

        )

        .subscribe(data=>{

            this.relations=data;

            this.cdr.detectChanges();

        });

    }

    loadProducts(){

        this.productAdminService

        .getAll()

        .subscribe(data=>{

            this.products=data;

            this.cdr.detectChanges();

        });

    }

    newRelation(){

        this.editing=false;

        this.selectedId=null;

        this.form={

            servicio_realizado_id:

            this.completedServiceId,

            producto_id:0,

            cantidad_utilizada:1

        };

    }

    edit(item:ServiceProduct){

        this.editing=true;

        this.selectedId=item.id!;

        this.form={

            ...item

        };

    }

    save(){

        if(this.editing){

            this.service

            .update(

                this.selectedId!,

                this.form

            )

            .subscribe(()=>{

                this.finish();

            });

        }

        else{

            this.service

            .create(

                this.form

            )

            .subscribe(()=>{

                this.finish();

            });

        }

    }

    finish(){

        this.newRelation();

        this.load();

    }

    remove(item:ServiceProduct){

        if(

            !confirm(

                '¿Eliminar producto?'

            )

        ){

            return;

        }

        this.service

        .delete(

            item.id!

        )

        .subscribe(()=>{

            this.load();

        });

    }

    closeModal(){

        this.close.emit();

    }

}