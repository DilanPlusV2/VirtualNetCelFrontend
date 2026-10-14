import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './admin-layout.component';

import { authGuard } from '../core/guards/auth.guard';

export const adminRoutes: Routes = [

{

    path:'admin',

    component:AdminLayoutComponent,

    canActivate:[authGuard],

    children:[

        {

            path:'',

            redirectTo:'dashboard',

            pathMatch:'full'

        },

        {

            path:'dashboard',

            loadComponent:()=>

                import('./dashboard/dashboard.component')

                .then(m=>m.DashboardComponent)

        },

        {

            path:'products',

            loadComponent:()=>

                import('./products/pages/products.component')

                .then(m=>m.ProductsComponent)

        },

        {

            path:'categories',

            loadComponent:()=>

                import('./categories/categories.component')

                .then(m=>m.CategoriesComponent)

        },

        {

            path:'inventory',

            loadComponent:()=>

                import('./inventory/inventory.component')

                .then(m=>m.InventoryComponent)

        },

        {

            path:'blog',

            loadComponent:()=>

                import('./blog/blog.component')

                .then(m=>m.BlogComponent)

        },

        {

            path:'services',

            loadComponent:()=>

                import('./services/services.component')

                .then(m=>m.ServicesComponent)

        }

    ]

}

];