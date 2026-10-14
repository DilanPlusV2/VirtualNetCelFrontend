import {

    Component,

    OnInit,

    ChangeDetectorRef

} from '@angular/core';

import {

    CommonModule

} from '@angular/common';

import {

    FormsModule

} from '@angular/forms';

import {

    Service

} from '../../../../core/models/service.model';

import {

    ServiceService

} from '../../../../core/services/service.service';

import {

    ServiceImagesComponent

} from '../service-images/service-images.component';

import {

    CompletedServicesComponent

} from '../completed-services/completed-services.component';

@Component({

    selector:'app-service-form',

    standalone:true,

    imports:[

        CommonModule,

        FormsModule,

        ServiceImagesComponent,

        CompletedServicesComponent

    ],

    templateUrl:'./service-form.component.html',

    styleUrls:[

        './service-form.component.css'

    ]

})

export class ServiceFormComponent implements OnInit{

    services:Service[]=[];

    loading=false;

    saving=false;

    editing=false;

    selectedId:number|null=null;

    showImages=false;

    showCompleted=false;

    selectedService=0;

    form:Service={

        nombre:'',

        descripcion:'',

        tipo:'INSTALACION',

        es_mantenimiento:false,

        precio_base:0,

        activo:true

    };

    constructor(

        private service:ServiceService,

        private cdr:ChangeDetectorRef

    ){}

    ngOnInit(){

        this.load();

    }

    load(){

        this.loading=true;

        this.service

        .getAll()

        .subscribe({

            next:data=>{

                this.services=data;

                this.loading=false;

                this.cdr.detectChanges();

            },

            error:()=>{

                this.loading=false;

                this.cdr.detectChanges();

            }

        });

    }

    newService(){

        this.editing=false;

        this.selectedId=null;

        this.form={

            nombre:'',

            descripcion:'',

            tipo:'INSTALACION',

            es_mantenimiento:false,

            precio_base:0,

            activo:true

        };

    }

    edit(service:Service){

        this.editing=true;

        this.selectedId=service.id!;

        this.form={

            ...service

        };

    }

    save(){

        this.saving=true;

        this.cdr.detectChanges();

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

        this.saving=false;

        this.newService();

        this.load();

    }

    remove(service:Service){

        if(

            !confirm(

                '¿Eliminar servicio?'

            )

        ){

            return;

        }

        this.service

        .delete(

            service.id!

        )

        .subscribe(()=>{

            this.load();

        });

    }

    openImages(service:Service){

        this.selectedService=service.id!;

        this.showImages=true;

    }

    openCompleted(service:Service){

        this.selectedService=service.id!;

        this.showCompleted=true;

    }

}