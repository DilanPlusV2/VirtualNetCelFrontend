import {

    Component,

    OnInit,

    ChangeDetectorRef,

} from '@angular/core';

import { Router } from '@angular/router';

import {

    CommonModule

} from '@angular/common';

import {

    DashboardService

} from '../../core/services/dashboard.service';

import {

    DashboardStats

} from '../../core/models/dashboard.model';

@Component({

    standalone:true,

    imports:[

        CommonModule

    ],

    templateUrl:'./dashboard.component.html',

    styleUrls:[

        './dashboard.component.css'

    ]

})

export class DashboardComponent

implements OnInit{

    stats?:DashboardStats;

    constructor(

        private dashboard:

        DashboardService,
        private cdr: ChangeDetectorRef,
        private router: Router

    ){}

    ngOnInit(){

        this.load();

    }

    load(){

        this.dashboard

        .getStats()

        .subscribe({

        next:data=>{

            this.stats=data;

            this.cdr.detectChanges();

        },

        error:error=>{

            console.error(error);

            this.cdr.detectChanges();

        }

    });

    }
    goProducts(){

    this.router.navigate(['/admin/products']);

}

goCategories(){

    this.router.navigate(['/admin/categories']);

}

goServices(){

    this.router.navigate(['/admin/services']);

}

goBlogs(){

    this.router.navigate(['/admin/blog']);

}

goInventory(){

    this.router.navigate(['/admin/inventory']);

}

}