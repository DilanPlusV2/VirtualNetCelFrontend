import { Component, inject } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

import {
  Output,
  EventEmitter
} from '@angular/core';

@Component({

    standalone:true,

    selector:'app-header',

    templateUrl:'./header.component.html',

    styleUrls:['./header.component.css']

})

export class HeaderComponent{

    private auth=inject(AuthService);

    private router=inject(Router);

    user=this.auth.getUser();

    logout(){

        this.auth.logout();

        this.router.navigate(['/']);

    }

    @Output()

menu = new EventEmitter<void>();

}