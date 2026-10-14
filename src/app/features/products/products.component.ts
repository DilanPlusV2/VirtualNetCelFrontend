import {

    Component,

    OnInit,

    ChangeDetectorRef

} from '@angular/core';

import { CommonModule } from '@angular/common';

import { PublicService } from '../../core/services/public.service';

@Component({

    standalone: true,

    imports: [CommonModule],

    templateUrl: './products.component.html',

    styleUrls: ['./products.component.css']

})

export class ProductsComponent implements OnInit {

    server = 'http://localhost:3000';

    loading = true;

    categorias: any[] = [];

    productos: any[] = [];

    productosFiltrados: any[] = [];

    productoSeleccionado:any=null;

    imagenPrincipal='';

    categoriaSeleccionada = 'Todos';

    whatsapp = '573013635349';

    constructor(

        private publicService: PublicService,

        private cdr: ChangeDetectorRef

    ) {}

    ngOnInit(): void {

        this.load();

    }

    load(): void {

        this.publicService

            .products()

            .subscribe({

                next: data => {

                    this.categorias = data;

                    this.productos = [];

                    data.forEach((categoria: any) => {

                        categoria.productos.forEach((producto: any) => {

                            producto.categoriaNombre = categoria.nombre;

                            this.productos.push(producto);

                        });

                    });

                    this.productosFiltrados = [...this.productos];

                    this.loading = false;

                    this.cdr.detectChanges();

                },

                error: err => {

                    console.error(err);

                    this.loading = false;

                }

            });

    }

    filtrar(nombre: string): void {

        this.categoriaSeleccionada = nombre;

        if (nombre === 'Todos') {

            this.productosFiltrados = [...this.productos];

            return;

        }

        this.productosFiltrados = this.productos.filter(

            p => p.categoriaNombre === nombre

        );

    }

    image(producto: any): string {

        if (

            producto.fotos &&

            producto.fotos.length

        ) {

            return this.server +

                producto.fotos[0].ruta_archivo;

        }

        return 'assets/no-image.png';

    }

verProducto(producto:any){

this.publicService
.product(producto.id)
.subscribe({

next:data=>{

this.productoSeleccionado=data;

this.imagenPrincipal=this.image(data);

this.cdr.detectChanges();

}

});

}

cerrarProducto(){

this.productoSeleccionado=null;

this.cdr.detectChanges();

}

cambiarImagen(url:string){

this.imagenPrincipal=url;

this.cdr.detectChanges();

}

pedirWhatsapp(){

    if(!this.productoSeleccionado){
        return;
    }

    const mensaje = `Hola, estoy interesado en el producto:

*${this.productoSeleccionado.nombre}*

Precio: ${this.productoSeleccionado.precio_venta}

¿Podrían brindarme más información?`;

    window.open(

        `https://wa.me/${this.whatsapp}?text=${encodeURIComponent(mensaje)}`,

        '_blank'

    );

}

}