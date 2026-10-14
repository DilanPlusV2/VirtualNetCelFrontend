import {

Component,

OnInit

} from '@angular/core';

import { CommonModule } from '@angular/common';

import {

FormsModule

} from '@angular/forms';

import { ChangeDetectorRef } from '@angular/core';

import {

Category

} from '../../core/models/category.model';

import {

CategoryService

} from '../../core/services/category.service';

@Component({

standalone:true,

imports:[

CommonModule,

FormsModule

],

templateUrl:'./categories.component.html',

styleUrls:[

'./categories.component.css'

]

})

export class CategoriesComponent implements OnInit{

categories:Category[]=[];

filteredCategories:Category[]=[];

search='';

loading=false;

showModal=false;

editing=false;

selectedId:number|null=null;

form:Category={

nombre:'',

descripcion:''

};

constructor(

private categoryService:CategoryService,
private cdr: ChangeDetectorRef

){}

ngOnInit(){

this.loadCategories();

}

loadCategories(){

this.loading=true;

this.categoryService

.getAll()

.subscribe({

next:(data)=>{

this.categories=data;

this.filteredCategories=data;

this.loading=false;

this.cdr.detectChanges();

},

error:()=>{

this.loading=false;

this.cdr.detectChanges();

}

});

}

filter(){

const value=this.search

.toLowerCase();

this.filteredCategories=

this.categories.filter(c=>

c.nombre

.toLowerCase()

.includes(value)

||

(c.descripcion||'')

.toLowerCase()

.includes(value)



);

this.cdr.detectChanges();

}

newCategory(){

this.editing=false;

this.selectedId=null;

this.form={

nombre:'',

descripcion:''

};

this.showModal=true;

this.cdr.detectChanges();

}

edit(category:Category){

this.editing=true;

this.selectedId=category.id!;

this.form={

nombre:category.nombre,

descripcion:category.descripcion

};

this.showModal=true;

this.cdr.detectChanges();

}

save(){

if(this.editing){

this.categoryService

.update(

this.selectedId!,

this.form,

)

.subscribe(()=>{

this.showModal=false;

this.loadCategories();

this.cdr.detectChanges();

});

}else{

this.categoryService

.create(this.form)

.subscribe(()=>{

this.showModal=false;

this.loadCategories();

this.cdr.detectChanges();

});

}

}

delete(category:Category){

if(

!confirm(

'¿Eliminar categoría?'

)

){

return;

}

this.categoryService

.delete(category.id!)

.subscribe(()=>{

this.loadCategories();

this.cdr.detectChanges();

});

}

}