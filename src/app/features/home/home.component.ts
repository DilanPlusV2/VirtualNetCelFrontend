import {

    Component,

    ChangeDetectorRef,

    OnInit

} from '@angular/core';

import { CommonModule } from '@angular/common';

import { PublicService } from '../../core/services/public.service';

import { Router } from '@angular/router';

@Component({

    standalone:true,

    imports:[CommonModule],

    templateUrl:'./home.component.html',

    styleUrls:['./home.component.css']

})

export class HomeComponent implements OnInit{

    home:any;

    loading=true;

    testimonioActual = 0;

    server='http://localhost:3000';

    constructor(

        private publicService:PublicService,

        private cdr:ChangeDetectorRef,

        private router:Router

    ){}

    ngOnInit():void{

        this.loadHome();
        setInterval(() => {

        if (!this.home?.testimonios?.length) return;

        this.siguienteTestimonio();

    }, 5000);
    }
    siguienteTestimonio() {

    if (!this.home?.testimonios) return;

    this.testimonioActual++;

    if (this.testimonioActual >= this.home.testimonios.length) {

        this.testimonioActual = 0;

    }

}

anteriorTestimonio() {

    if (!this.home?.testimonios) return;

    this.testimonioActual--;

    if (this.testimonioActual < 0) {

        this.testimonioActual =
            this.home.testimonios.length - 1;

    }

}

    loadHome(){

        this.publicService

        .home()

        .subscribe({

            next:data=>{

                this.home=data;

                this.loading=false;

                this.cdr.detectChanges();

            }

        });

    }

    productImage(producto:any){

    if(producto.fotos?.length){

        return this.server +
        producto.fotos[0].ruta_archivo;

    }

    return 'assets/no-image.png';

}

serviceImage(servicio:any){

    if(servicio.imagenes?.length){

        return this.server +
        servicio.imagenes[0].ruta_imagen;

    }

    return 'assets/no-image.png';

}

goToServices(){

    this.router.navigate(['/servicios']);

}

goToProducts(){

    this.router.navigate(['/productos']);

}

}