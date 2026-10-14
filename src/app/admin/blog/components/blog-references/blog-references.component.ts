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
    BlogReference
} from '../../../../core/models/blog-reference.model';

import {
    BlogReferenceService
} from '../../../../core/services/blog-reference.service';

@Component({

    selector:'app-blog-references',

    standalone:true,

    imports:[
        CommonModule,
        FormsModule
    ],

    templateUrl:'./blog-references.component.html',

    styleUrls:[
        './blog-references.component.css'
    ]

})

export class BlogReferencesComponent implements OnChanges{

    @Input()
    show=false;

    @Input()
    blogId!:number;

    @Output()
    close=new EventEmitter<void>();

    references:BlogReference[]=[];

    editing=false;

    selectedId:number|null=null;

    form:BlogReference={

        blog_id:0,

        titulo:'',

        autores:'',

        url:'',

        anio:new Date().getFullYear()

    };

    constructor(

        private service:BlogReferenceService,
        private cdr: ChangeDetectorRef

    ){}

    ngOnChanges(changes:SimpleChanges){

        if(changes['show'] && this.show){

            this.newReference();

            this.load();

             this.cdr.detectChanges();

        }

    }

    load(){

        this.service

        .getByBlog(this.blogId)

        .subscribe(data=>{

            this.references=data;

            this.cdr.detectChanges();

        });

    }

    newReference(){

        this.editing=false;

        this.selectedId=null;

        this.form={

            blog_id:this.blogId,

            titulo:'',

            autores:'',

            url:'',

            anio:new Date().getFullYear()

        };

         this.cdr.detectChanges();

    }

    edit(reference:BlogReference){

        this.editing=true;

        this.selectedId=reference.id!;

        this.form={

            ...reference

        };

        this.cdr.detectChanges();

    }

    save(){

        if(this.editing){

            this.service

            .update(

                this.selectedId!,

                this.form

            )

            .subscribe(()=>{

                this.newReference();

                this.load();

                this.cdr.detectChanges();

            });

        }else{

            this.service

            .create(this.form)

            .subscribe(()=>{

                this.newReference();

                this.load();

                this.cdr.detectChanges();

            });

        }

    }

    remove(reference:BlogReference){

        if(!confirm('¿Eliminar referencia?')){

            return;

        }

        this.service

        .delete(reference.id!)

        .subscribe(()=>{

            this.load();

            this.cdr.detectChanges();

        });

    }

    closeModal(){

        this.close.emit();

        this.cdr.detectChanges();

    }

}