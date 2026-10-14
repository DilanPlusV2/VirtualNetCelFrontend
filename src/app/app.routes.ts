import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from './core/guards/auth.guard';
import { adminRoutes } from './admin/admin.routes';

export const routes: Routes = [

{
    path:'',

    component:LayoutComponent,

    children:[

        {

            path:'',

            loadComponent:()=>

                import('./features/home/home.component')

                .then(m=>m.HomeComponent)

        },

        {

            path:'productos',

            loadComponent:()=>

                import('./features/products/products.component')

                .then(m=>m.ProductsComponent)

        },

        {

            path:'nosotros',

            loadComponent:()=>

                import('./features/about/about.component')

                .then(m=>m.AboutComponent)

        },

        {

            path:'contacto',

            loadComponent:()=>

                import('./features/contact/contact.component')

                .then(m=>m.ContactComponent)

        },
        {

            path:'blog',

            loadComponent:()=>

                import('./features/blog/blog.component')

                .then(m=>m.BlogComponent)

        },
        {
            path:'servicios',

            loadComponent:()=>

                import('./features/service/service.component')

                .then(m=>m.ServiceComponent)

        },
        {
    path: 'blog/:slug',
    loadComponent: () =>
        import('./features/blog/blog-detail/blog-detail.component')
        .then(m => m.BlogDetailComponent)
}

    ]

},
...adminRoutes,
{

    path:'**',

    redirectTo:''

}

];