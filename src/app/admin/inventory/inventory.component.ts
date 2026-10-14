import {
    Component,
    OnInit
} from '@angular/core';

import {
    CommonModule
} from '@angular/common';

import {
    FormsModule
} from '@angular/forms';

import {
    Product
} from '../../core/models/product.model';

import {
    Category
} from '../../core/models/category.model';

import {
    InventoryMovement
} from '../../core/models/inventory.model';

import {
    ProductAdminService
} from '../products/services/product-admin.service';

import {
    InventoryService
} from '../../core/services/inventory.service';

import {
    CategoryService
} from '../../core/services/category.service';

import { ChangeDetectorRef } from '@angular/core';

import { NgZone } from '@angular/core';

@Component({

    selector: 'app-inventory',

    standalone: true,

    imports: [
        CommonModule,
        FormsModule
    ],

    templateUrl: './inventory.component.html',

    styleUrls: [
        './inventory.component.css'
    ]

})

export class InventoryComponent implements OnInit {

    products: Product[] = [];

    filteredProducts: Product[] = [];

    categories: Category[] = [];

    history: InventoryMovement[] = [];

    search = '';

    category = '';

    fromDate = '';

    toDate = '';

    showModal = false;

    showHistory = false;

    selectedProduct: Product | null = null;

    historyProduct: Product | null = null;

    errorStock = '';

    totalEntradas = 0;

    totalSalidas = 0;

    stockActual = 0;

    form: InventoryMovement = {

        producto_id: 0,

        tipo: 'ENTRADA',

        cantidad: 1,

        observacion: ''

    };

    constructor(

        private productService: ProductAdminService,

        private inventoryService: InventoryService,

        private categoryService: CategoryService,

        private cdr: ChangeDetectorRef,
        private zone: NgZone

    ) {}

    ngOnInit(): void {

        this.loadProducts();

        this.loadCategories();

    }

    loadProducts(): void {

    console.log("ANTES");

    this.productService
        .getAll()
        .subscribe(products => {

            console.log("LLEGARON");

            this.products = products;

            this.filteredProducts = products;

            this.cdr.detectChanges();

            console.log(this.products.length);

        });

}

    loadCategories(): void {

        this.categoryService

            .getAll()

            .subscribe(categories => {

                this.categories = categories;

                this.cdr.detectChanges();

            });

    }

    filter(): void {

        this.filteredProducts = this.products.filter(product => {

            const byName = product.nombre
                .toLowerCase()
                .includes(this.search.toLowerCase());

            const byCategory =

                this.category === '' ||

                product.categoria_id === Number(this.category);

            return byName && byCategory;

        });

        this.cdr.detectChanges();

    }

    clearFilters(): void {

        this.search = '';

        this.category = '';

        this.fromDate = '';

        this.toDate = '';

        this.filter();

        this.cdr.detectChanges();

    }

    movement(product: Product): void {

        this.selectedProduct = product;

        this.errorStock = '';

        this.form = {

            producto_id: product.id!,

            tipo: 'ENTRADA',

            cantidad: 1,

            observacion: ''

        };

        this.showModal = true;

        this.cdr.detectChanges();

    }

    saving=false;

save():void{

    if(this.saving){

        return;

    }

    this.errorStock='';

    if(

        this.form.tipo==="SALIDA" &&

        this.selectedProduct &&

        this.form.cantidad>(this.selectedProduct.stock ?? 0)

    ){

        this.errorStock="No es posible registrar una salida mayor al stock disponible.";

        return;

    }

    this.saving=true;

    this.inventoryService
    .create(this.form)
    .subscribe({

        next: () => {

    this.showModal = false;

    this.saving = false;

    this.selectedProduct = null;

    this.cdr.detectChanges();

    this.loadProducts();

},

        error:(err)=>{

            console.error(err);

            this.saving=false;

        }

    });

}

    viewHistory(product: Product): void {

        this.inventoryService

            .history(product.id!)

            .subscribe(data => {

                if (this.fromDate) {

                    const from = new Date(this.fromDate);

                    data = data.filter(item =>

                        new Date(item.createdAt!) >= from

                    );

                }

                if (this.toDate) {

                    const to = new Date(this.toDate);

                    to.setHours(23, 59, 59);

                    data = data.filter(item =>

                        new Date(item.createdAt!) <= to

                    );

                }

                this.history = data;

                this.historyProduct = product;

                this.showHistory = true;

                this.calculateResume();

                this.cdr.detectChanges();

            });

    }

    calculateResume(): void {

    this.totalEntradas = this.history
        .filter(x => x.tipo === 'ENTRADA')
        .reduce((sum, x) => sum + x.cantidad, 0);

    this.totalSalidas = this.history
        .filter(x => x.tipo === 'SALIDA')
        .reduce((sum, x) => sum + x.cantidad, 0);

    this.stockActual = this.history.length
        ? (this.history[0].stock_nuevo ?? 0)
        : 0;

}

    stockClass(product: Product): string {

        const stock = product.stock ?? 0;

        if (stock === 0) {

            return 'danger';

        }

        if (stock <= 5) {

            return 'warning';

        }

        return 'success';

    }

}