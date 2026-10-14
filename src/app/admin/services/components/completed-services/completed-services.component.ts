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

    CompletedService

} from '../../../../core/models/completed-service.model';

import {

    CompletedServiceService

} from '../../../../core/services/completed-service.service';

import {

    ServiceProductsComponent

} from '../service-products/service-products.component';

@Component({

    selector:'app-completed-services',

    standalone:true,

    imports:[

        CommonModule,

        FormsModule,

        ServiceProductsComponent

    ],

    templateUrl:'./completed-services.component.html',

    styleUrls:[

        './completed-services.component.css'

    ]

})

export class CompletedServicesComponent
implements OnChanges{

    @Input()

    show=false;

    @Input()

    serviceId!:number;

    @Output()

    close=

    new EventEmitter<void>();

    completed:CompletedService[]=[];

    editing=false;

    selectedId:number|null=null;

    showProducts=false;

    selectedCompleted=0;

    form:CompletedService={

        servicio_id:0,

        cliente:'',

        empresa:'',

        telefono:'',

        direccion:'',

        ciudad:'',

        tecnico:'',

        fecha:'',

        observaciones:'',

        testimonio:'',

        valor_cobrado:0,

        descontar_inventario:true,

        estado:'FINALIZADO'

    };

    constructor(

        private service:

        CompletedServiceService,

        private cdr:

        ChangeDetectorRef

    ){}

    ngOnChanges(changes:SimpleChanges){

        if(

            changes['show'] &&

            this.show

        ){

            this.newCompleted();

            this.load();

        }

    }

    load(){

        this.service

        .getAll()

        .subscribe(data=>{

            this.completed=

            data.filter(

                x=>

                x.servicio_id===

                this.serviceId

            );

            this.cdr.detectChanges();

        });

    }

    newCompleted(){

        this.editing=false;

        this.selectedId=null;

        this.form={

            servicio_id:

            this.serviceId,

            cliente:'',

            empresa:'',

            telefono:'',

            direccion:'',

            ciudad:'',

            tecnico:'',

            fecha:'',

            observaciones:'',

            testimonio:'',

            valor_cobrado:0,

            descontar_inventario:true,

            estado:'FINALIZADO'

        };

    }

    edit(item:CompletedService){

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

                this.newCompleted();

                this.load();

            });

        }

        else{

            this.service

            .create(this.form)

            .subscribe(()=>{

                this.newCompleted();

                this.load();

            });

        }

    }

    remove(item:CompletedService){

        if(

            !confirm(

                '¿Eliminar servicio realizado?'

            )

        ){

            return;

        }

        this.service

        .delete(item.id!)

        .subscribe(()=>{

            this.load();

        });

    }

    openProducts(item:CompletedService){

        this.selectedCompleted=

        item.id!;

        this.showProducts=true;

    }

    closeModal(){

        this.close.emit();

    }

}