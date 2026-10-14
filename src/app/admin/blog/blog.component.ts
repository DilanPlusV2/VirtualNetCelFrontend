import {
    Component,
    OnInit,
    ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Blog } from '../../core/models/blog.model';

import { BlogService } from '../../core/services/blog.service';

import { BlogFormComponent } from './components/blog-form/blog-form.component';

@Component({

    standalone: true,

    selector: 'app-blog',

    imports: [
        CommonModule,
        FormsModule,
        BlogFormComponent
    ],

    templateUrl: './blog.component.html',

    styleUrls: [
        './blog.component.css'
    ]

})

export class BlogComponent implements OnInit {

    blogs: Blog[] = [];

    filteredBlogs: Blog[] = [];

    selectedBlog: Blog | null = null;

    showForm = false;

    search = '';

    loading = false;

    constructor(

        private blogService: BlogService,

        private cdr: ChangeDetectorRef

    ){}

    ngOnInit(): void {

        this.loadBlogs();

    }

    loadBlogs(): void {

        this.loading = true;

        this.blogService
        .getAll()
        .subscribe({

            next: (blogs) => {

                this.blogs = blogs;

                this.filteredBlogs = blogs;

                this.loading = false;

                this.cdr.detectChanges();

            },

            error: (err) => {

                console.error(err);

                this.loading = false;

                this.cdr.detectChanges();

            }

        });

    }

    filter(): void {

        const value = this.search.toLowerCase();

        this.filteredBlogs = this.blogs.filter(blog =>

            blog.titulo.toLowerCase().includes(value)

            ||

            blog.autor.toLowerCase().includes(value)

        );

        this.cdr.detectChanges();

    }

    newBlog(): void {

        this.selectedBlog = null;

        this.showForm = true;

        this.cdr.detectChanges();

    }

    edit(blog: Blog): void {

        this.selectedBlog = {

            ...blog

        };

        this.showForm = true;

        this.cdr.detectChanges();

    }

    delete(blog: Blog): void {

        if (!confirm('¿Eliminar publicación?')) {

            return;

        }

        this.blogService
        .delete(blog.id!)
        .subscribe({

            next: () => {

                this.loadBlogs();

                this.cdr.detectChanges();

            },

            error: (err) => {

                console.error(err);

                this.cdr.detectChanges();

            }

        });

    }

    reload(): void {

        this.showForm = false;

        this.selectedBlog = null;

        this.loadBlogs();

        this.cdr.detectChanges();

    }

}

