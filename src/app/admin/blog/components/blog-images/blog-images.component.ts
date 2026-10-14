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

    BlogImage

} from '../../../../core/models/blog-image.model';

import {

    BlogImageService

} from '../../../../core/services/blog-image.service';

@Component({

    selector:'app-blog-images',

    standalone:true,

    imports:[

        CommonModule,

        FormsModule

    ],

    templateUrl:'./blog-images.component.html',

    styleUrls:[

        './blog-images.component.css'

    ]

})

export class BlogImagesComponent implements OnChanges{

    @Input()

    show=false;

    @Input()

    blogId!:number;

    @Output()

    close=new EventEmitter<void>();

    images:BlogImage[]=[];

    loading=false;

    saving=false;

    editing=false;

    selectedId:number|null=null;

    selectedFile:File|null=null;

    preview:string|null=null;

    form:BlogImage={

        blog_id:0,

        titulo_imagen:'',

        descripcion:'',

        orden:1

    };

    constructor(

        private service:BlogImageService,

        private cdr:ChangeDetectorRef

    ){}

    ngOnChanges(changes:SimpleChanges){

        if(changes['show'] && this.show){

            this.newImage();

            this.loadImages();

        }

    }

    loadImages(){

        if(!this.blogId){

            return;

        }

        this.loading=true;

        this.service

        .getByBlog(

            this.blogId

        )

        .subscribe({

            next:data=>{

                this.images=data;

                this.loading=false;

                this.cdr.detectChanges();

            },

            error:()=>{

                this.loading=false;

                this.cdr.detectChanges();

            }

        });

    }

    selectImage(event:any){

        const file=event.target.files[0];

        if(!file){

            return;

        }

        this.selectedFile=file;

        const reader=new FileReader();

        reader.onload=()=>{

            this.preview=reader.result as string;

            this.cdr.detectChanges();

        };

        reader.readAsDataURL(file);

    }

    newImage(){

        this.editing=false;

        this.selectedId=null;

        this.preview=null;

        this.selectedFile=null;

        this.form={

            blog_id:this.blogId,

            titulo_imagen:'',

            descripcion:'',

            orden:this.images.length+1

        };

        this.cdr.detectChanges();

    }

    edit(image:BlogImage){

        this.editing=true;

        this.selectedId=image.id!;

        this.form={

            ...image

        };

        this.preview='http://localhost:3000'+image.ruta_archivo;

        this.selectedFile=null;

        this.cdr.detectChanges();

    }
        save(){

        if(this.saving){

            return;

        }

        if(!this.selectedFile && !this.editing){

            return;

        }

        this.saving=true;

        this.cdr.detectChanges();

        if(this.editing){

            this.service

            .update(

                this.selectedId!,

                this.form

            )

            .subscribe({

                next:()=>{

                    if(this.selectedFile){

                        this.replaceImage();

                    }else{

                        this.finish();

                    }

                }

            });

        }else{

            this.service

            .create(

                this.form,

                this.selectedFile!

            )

            .subscribe({

                next:()=>{

                    this.finish();

                }

            });

        }

    }

    replaceImage(){

        this.service

        .uploadImage(

            this.selectedId!,

            this.selectedFile!

        )

        .subscribe({

            next:()=>{

                this.finish();

            }

        });

    }

    finish(){

        this.saving=false;

        this.newImage();

        this.loadImages();

        this.cdr.detectChanges();

    }

    remove(image:BlogImage){

        if(!confirm('¿Eliminar imagen?')){

            return;

        }

        this.service

        .delete(

            image.id!

        )

        .subscribe(()=>{

            this.loadImages();

        });

    }

    closeModal(){

        this.close.emit();

    }

}