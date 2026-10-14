import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { PublicService } from '../../core/services/public.service';

@Component({
  standalone: true,
  selector: 'app-service',
  imports: [CommonModule],
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  services: any[] = [];

  constructor(

    private publicService: PublicService,

    private cdr: ChangeDetectorRef

  ) {}

  serviceSelected: any = null;

mainImage = '';

server = 'http://localhost:3000';

whatsapp = '573013635349';

  ngOnInit(): void {

    this.loadServices();

  }

  loadServices() {

    this.publicService
      .services()
      .subscribe({

        next: data => {

          this.services = data;

          this.cdr.detectChanges();

        },

        error: err => {

          console.error(err);

        }

      });

  }

  image(service: any): string {

    if (
      service.imagenes &&
      service.imagenes.length
    ) {

      return 'http://localhost:3000' +
        service.imagenes[0].ruta_imagen;

    }

    return 'assets/no-image.png';

  }

  verServicio(service: any) {

    this.publicService
        .service(service.id)
        .subscribe({

            next: data => {

                this.serviceSelected = data;

                this.mainImage = this.image(data);

                this.cdr.detectChanges();

            },

            error: err => {

                console.error(err);

            }

        });

}

cerrarServicio() {

    this.serviceSelected = null;

    this.mainImage = '';

    this.cdr.detectChanges();

}

cambiarImagen(url: string) {

    this.mainImage = url;

    this.cdr.detectChanges();

}

pedirWhatsapp() {

    if (!this.serviceSelected) {
        return;
    }

    const mensaje = `Hola.

Estoy interesado en el servicio:

*${this.serviceSelected.nombre}*

Tipo: ${this.serviceSelected.tipo}

Valor desde: ${this.serviceSelected.precio_base}

¿Podrían brindarme más información?`;

    window.open(

        `https://wa.me/${this.whatsapp}?text=${encodeURIComponent(mensaje)}`,

        '_blank'

    );

}

}