import { Component, inject } from '@angular/core';

import {

    Router,

    RouterLink,

    RouterLinkActive

} from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

import { Input } from '@angular/core';

@Component({

    standalone:true,

    selector:'app-sidebar',

    imports:[

        RouterLink,

        RouterLinkActive

    ],

    templateUrl:'./sidebar.component.html',

    styleUrls:['./sidebar.component.css']

})

export class SidebarComponent{

    private auth=inject(AuthService);

    private router=inject(Router);

    logout(){

        this.auth.logout();

        this.router.navigate(['/']);

    }
    @Input()

    open = false;

}