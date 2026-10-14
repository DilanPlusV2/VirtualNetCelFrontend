import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { PublicService } from '../../core/services/public.service';

import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-blog',
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogs: any[] = [];

  server='http://localhost:3000';

  constructor(

    private publicService: PublicService,

    private cdr: ChangeDetectorRef,

    private router: Router

  ) {}

  ngOnInit(): void {

    this.publicService

      .blogs()

      .subscribe({

        next: data => {

          this.blogs = data;

          this.cdr.detectChanges();

        },

        error: err => console.error(err)

      });

  }
  image(blog:any){

    if(blog.imagen_portada){

        return this.server + blog.imagen_portada;

    }

    return 'assets/no-image.png';

}
abrirBlog(blog:any){

    this.router.navigate([
        '/blog',
        blog.slug
    ]);

}

}