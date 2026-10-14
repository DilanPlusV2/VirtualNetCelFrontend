import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { CommonModule } from '@angular/common';

import { PublicService } from '../../../core/services/public.service';

@Component({
  standalone: true,
  selector: 'app-blog-detail',
  imports: [CommonModule],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  server = 'http://localhost:3000';

  blog: any;

  relatedBlogs: any[] = [];


blogsRelacionados: any[] = [];

  constructor(

    private route: ActivatedRoute,

    private router: Router,

    private publicService: PublicService,

    private cdr: ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      const slug = params.get('slug');

      if (slug) {

        this.loadBlog(slug);

      }

    });

  }

  loadBlog(slug: string): void {

    this.publicService
      .blogDetail(slug)
      .subscribe({

        next: data => {

          this.blog = data;

          this.loadRelatedBlogs(slug);

          this.cdr.detectChanges();

        },

        error: err => {

          console.error(err);

        }

      });

  }

  loadRelatedBlogs(slug: string): void {

    this.publicService
      .blogs()
      .subscribe({

        next: data => {

          this.relatedBlogs = data
            .filter((b: any) => b.slug !== slug)
            .slice(0, 3);

          this.cdr.detectChanges();

        },

        error: err => console.error(err)

      });

  }

  portada(): string {

  if (this.blog?.imagen_portada) {
    return this.server + this.blog.imagen_portada;
  }

  return 'assets/no-image.png';

}

  image(item: any): string {

    if (!item) {
        return 'assets/no-image.png';
    }

    // Imagen de un blog
    if (item.imagen_portada) {
        return this.server + item.imagen_portada;
    }

    // Imagen de la galería
    if (item.ruta_archivo) {
        return this.server + item.ruta_archivo;
    }

    return 'assets/no-image.png';

}

  openBlog(blog: any): void {

    this.router.navigate([
      '/blog',
      blog.slug
    ]);

    window.scrollTo({

      top: 0,

      behavior: 'smooth'

    });

  }

  shareWhatsapp(): void {

    if (!this.blog) return;

    const mensaje = `Te comparto este artículo:

${this.blog.titulo}

${window.location.href}`;

    window.open(

      `https://wa.me/?text=${encodeURIComponent(mensaje)}`,

      '_blank'

    );

  }

  shareFacebook(): void {

    window.open(

      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,

      '_blank'

    );

  }

  shareLinkedin(): void {

    window.open(

      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,

      '_blank'

    );

  }

  abrirRelacionado(blog: any): void {

  if (!blog) {
    return;
  }

  this.router.navigate(['/blog', blog.slug]);

}

}