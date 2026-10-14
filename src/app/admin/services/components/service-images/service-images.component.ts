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

    ServiceImage

} from '../../../../core/models/service-image.model';

import {

    ServiceImageService

} from '../../../../core/services/service-image.service';

@Component({

    selector:'app-service-images',

    standalone:true,

    imports:[

        CommonModule,

        FormsModule

    ],

    templateUrl:'./service-images.component.html',

    styleUrls:[

        './service-images.component.css'

    ]

})

export class ServiceImagesComponent
implements OnChanges{

    @Input()

    show=false;

    @Input()

    serviceId!:number;

    @Output()

    close=new EventEmitter<void>();

    images:ServiceImage[]=[];

    editing=false;

    selectedId:number|null=null;

    selectedFile?:File;

    preview:string|null=null;

    form:ServiceImage={

        servicio_id:0,

        titulo:'',

        descripcion:'',

        principal:false

        

    };

    constructor(

        private service:ServiceImageService,

        private cdr:ChangeDetectorRef,

    ){}

    readonly apiUrl = 'http://localhost:3000';

    ngOnChanges(changes:SimpleChanges){

        if(

            changes['show']

            &&

            this.show

        ){

            this.newImage();

            this.load();

            this.cdr.detectChanges();

        }
        this.cdr.detectChanges();
    }

    load(){

        this.service

        .getByService(

            this.serviceId

        )

        .subscribe(data=>{

            this.images=data;

            this.cdr.detectChanges();

        });
        this.cdr.detectChanges();
    }

    newImage(){

        this.editing=false;

        this.selectedId=null;

        this.selectedFile=undefined;

        this.preview=null;

        this.form={

            servicio_id:this.serviceId,

            titulo:'',

            descripcion:'',

            principal:false

        };

        this.cdr.detectChanges();

    }

    onFile(event:any){

        const file=

            event.target.files[0];

        if(!file){

            return;

        }

        this.selectedFile=file;

        const reader=

            new FileReader();

        reader.onload=()=>{

            this.preview=

                reader.result as string;

            this.cdr.detectChanges();

        };

        reader.readAsDataURL(file);

        this.cdr.detectChanges();

    }

    edit(image: ServiceImage) {

    this.editing = true;

    this.selectedId = image.id!;

    this.form = {
        ...image
    };

    this.preview = this.getImageUrl(image.ruta_imagen);

    this.cdr.detectChanges();
}

    save(){

        if(

            !this.editing

        ){

            this.service

            .create(

                this.form,

                this.selectedFile!

            )

            .subscribe(()=>{

                this.finish();

            });
            this.cdr.detectChanges();

        }

        else{

            this.service

            .update(

                this.selectedId!,

                this.form

            )

            .subscribe(()=>{

                if(

                    this.selectedFile

                ){

                    this.service

                    .uploadImage(

                        this.selectedId!,

                        this.selectedFile

                    )

                    .subscribe(()=>{

                        this.finish();

                    });

                    this.cdr.detectChanges();

                }

                else{

                    this.finish();
                    this.cdr.detectChanges();
                }

            });

        }

    }

    finish(){

        this.newImage();

        this.load();

        this.cdr.detectChanges();

    }

    remove(image:ServiceImage){

        if(

            !confirm(

                '¿Eliminar imagen?'

            )

        ){

            return;

        }

        this.service

        .delete(

            image.id!

        )

        .subscribe(()=>{

            this.load();

            this.cdr.detectChanges();

        });

    }

    closeModal(){

        this.close.emit();

        this.cdr.detectChanges();

    }

    getImageUrl(path?: string): string {

    if (!path) {
        return '';
    }

    if (
        path.startsWith('http://') ||
        path.startsWith('https://')
    ) {
        return path;
    }
    
    return `${this.apiUrl}${path}`;
    
}

}