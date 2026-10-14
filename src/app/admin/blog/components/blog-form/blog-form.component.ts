import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges,
    ChangeDetectorRef
} from '@angular/core';
import { BlogImagesComponent } from '../blog-images/blog-images.component';
import {
    CommonModule
} from '@angular/common';

import {
    FormsModule
} from '@angular/forms';

import {
    Blog
} from '../../../../core/models/blog.model';

import {
    BlogService
} from '../../../../core/services/blog.service';

import { BlogReferencesComponent } from '../blog-references/blog-references.component';

@Component({

    selector:'app-blog-form',

    standalone:true,

    imports:[
        CommonModule,
        FormsModule,
        BlogImagesComponent,
        BlogReferencesComponent
    ],

    templateUrl:'./blog-form.component.html',

    styleUrls:[
        './blog-form.component.css'
    ]

})

export class BlogFormComponent implements OnChanges{

    @Input()
    show=false;
    showImages = false;
    showReferences=false;

    @Input()
    blog:Blog|null=null;

    @Output()
    close=new EventEmitter<void>();

    @Output()
    saved=new EventEmitter<void>();

    saving=false;

    uploadingBanner=false;

    editing=false;

    selectedBanner:File|null=null;

    preview:string|null=null;

    form:Blog={

        titulo:'',

        slug:'',

        resumen:'',

        contenido:'',

        autor:'',

        publicado:true

    };

    constructor(

        private blogService:BlogService,

        private cdr:ChangeDetectorRef

    ){}
    manageImages():void{

    if(!this.blog?.id){

        return;

    }

    this.showImages = true;

    this.cdr.detectChanges();

}
manageReferences(){

    this.showReferences=true;

    this.cdr.detectChanges();

}
    ngOnChanges(changes:SimpleChanges):void{

        if(changes['blog']){

            if(this.blog){

                this.editing=true;

                this.form={

                    id:this.blog.id,

                    titulo:this.blog.titulo,

                    slug:this.blog.slug,

                    resumen:this.blog.resumen,

                    contenido:this.blog.contenido,

                    autor:this.blog.autor,

                    publicado:this.blog.publicado,

                    imagen_portada:this.blog.imagen_portada

                };

                this.preview=

        this.blog.imagen_portada

        ? 'http://localhost:3000'+this.blog.imagen_portada

        : null;

            }else{

                this.resetForm();

                this.preview=null;

            }

            this.cdr.detectChanges();

        }

    }

    generateSlug():void{

        this.form.slug=(this.form.titulo||'')

        .toLowerCase()

        .trim()

        .normalize('NFD')

        .replace(/[\u0300-\u036f]/g,'')

        .replace(/[^a-z0-9 ]/g,'')

        .replace(/\s+/g,'-');

        this.cdr.detectChanges();

    }

    selectBanner(event:any):void{

        const file=event.target.files[0];

        if(!file){

            return;

        }

        this.selectedBanner=file;

        const reader=new FileReader();

        reader.onload=()=>{

            this.preview=reader.result as string;

            this.cdr.detectChanges();

        };

        reader.readAsDataURL(file);

    }

    save():void{

        if(this.saving){

            return;

        }

        this.saving=true;

        this.cdr.detectChanges();

        const request=this.editing

        ?

        this.blogService.update(

            this.blog!.id!,

            this.form

        )

        :

        this.blogService.create(

            this.form

        );

        request.subscribe({

            next:(blog:any)=>{
                
                if(this.selectedBanner){

                    this.uploadingBanner=true;

                    this.cdr.detectChanges();

                    const blogId = this.editing
    ? this.blog!.id!
    : blog.blog.id;

this.blogService

.uploadBanner(

    blogId,

    this.selectedBanner

)

                    .subscribe({

                        next:()=>{

                            this.finishSave();

                        },

                        error:(err)=>{

                            console.error(err);

                            this.finishSave();

                        }

                    });

                }else{

                    this.finishSave();

                }

            },

            error:(err)=>{

                console.error(err);

                this.saving=false;

                this.uploadingBanner=false;

                this.cdr.detectChanges();

            }

        });

    }

    cancel():void{

        this.closeModal();

    }

    closeModal():void{

        this.resetForm();

        this.close.emit();

        this.cdr.detectChanges();

    }

    private finishSave():void{

        this.saving=false;

        this.uploadingBanner=false;

        this.selectedBanner=null;

        this.preview=null;

        this.saved.emit();

        this.closeModal();

        this.cdr.detectChanges();

    }

    private resetForm():void{

        this.editing=false;

        this.selectedBanner=null;

        this.preview=null;

        this.uploadingBanner=false;

        this.form={

            titulo:'',

            slug:'',

            resumen:'',

            contenido:'',

            autor:'',

            publicado:true

        };

    }

}
