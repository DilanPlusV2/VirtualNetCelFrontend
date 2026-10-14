import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    OnInit,
    SimpleChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Product } from '../../../../core/models/product.model';
import { Category } from '../../../../core/models/category.model';

import { ProductAdminService } from '../../services/product-admin.service';
import { CategoryService } from '../../../../core/services/category.service';
import { ChangeDetectorRef } from '@angular/core';

import { ProductImagesComponent } from '../product-images/product-images.component';

import { ProductManualComponent } from '../product-manual/product-manual.component';

import { ProductDatasheetComponent } from '../product-datasheet/product-datasheet.component';

@Component({

    selector:'app-product-form',

    standalone:true,

    imports:[
        CommonModule,
        FormsModule,
        ProductImagesComponent,
        ProductManualComponent,

    ProductDatasheetComponent
    ],

    templateUrl:'./product-form.component.html',

    styleUrls:[
        './product-form.component.css'
    ]

})

export class ProductFormComponent implements OnInit, OnChanges{

    @Input()
    product: Product | null = null;

    @Output()
    close = new EventEmitter<void>();

    @Output()
    saved = new EventEmitter<void>();

    categories: Category[] = [];

    form: Product = {

        nombre:'',
        descripcion:'',
        precio_compra:0,
        precio_venta:0,
        categoria_id:0,
        activo:true

    };

    constructor(

        private productService: ProductAdminService,
        private categoryService: CategoryService,
        private cdr: ChangeDetectorRef

    ){
        this.loadCategories();
    }

    ngOnInit(): void {

        this.loadCategories();

    }

    ngOnChanges(changes: SimpleChanges): void {

        console.log("Product recibido", this.product);

        if(changes['product']){

            if(this.product){

                this.form = {

                    ...this.product

                };

            }else{

                this.form = {

                    nombre:'',
                    descripcion:'',
                    precio_compra:0,
                    precio_venta:0,
                    categoria_id:0,
                    activo:true

                };

            }

        }

    }

    loadCategories(): void {

    this.categoryService
        .getAll()
        .subscribe(data => {

            this.categories = data;

            this.cdr.detectChanges();

        });

}

    save(): void {

        if(this.product?.id){

            this.productService
                .update(
                    this.product.id,
                    this.form
                )
                .subscribe(() => {

                    this.saved.emit();

                });

        }else{

            this.productService
                .create(this.form)
                .subscribe(() => {

                    this.saved.emit();

                });

        }

    }

    cancel(): void {

        this.close.emit();

    }

}