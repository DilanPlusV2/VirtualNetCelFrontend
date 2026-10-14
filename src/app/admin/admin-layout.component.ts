import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';

import { SidebarComponent } from './layout/sidebar/sidebar.component';

import { HeaderComponent } from './layout/header/header.component';

import { CommonModule } from '@angular/common';

@Component({

    standalone:true,

    selector:'app-admin-layout',

    imports:[

        RouterOutlet,

        SidebarComponent,

        HeaderComponent,

        CommonModule,

    ],

    templateUrl:'./admin-layout.component.html',

    styleUrls:['./admin-layout.component.css']

})

export class AdminLayoutComponent{

    sidebarOpen=false;

    toggleSidebar(){

        this.sidebarOpen = !this.sidebarOpen;

    }

}