import { Component, inject, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

@Component({

    selector:'app-topbar',

    standalone:true,

    imports:[
        CommonModule,
        FormsModule
    ],

    templateUrl:'./topbar.component.html',

    styleUrls:['./topbar.component.css']

})

export class TopbarComponent implements OnInit{

    private auth=inject(AuthService);

    public router=inject(Router);

    email='';

    password='';

    loading=false;

    error='';

    user:any=null;

    ngOnInit(){

        this.user=this.auth.getUser();

    }

    login(){

        this.loading=true;

        this.error='';

        this.auth.login({

            email:this.email,

            password:this.password

        }).subscribe({

            next:(response)=>{

                this.user=response.user;

                this.loading=false;

                this.router.navigate(['/admin']);

            },

            error:(err)=>{

                this.loading=false;

                this.error=err.error?.message;

            }

        });

    }

    logout(){

        this.auth.logout();

        this.user=null;

        this.email='';

        this.password='';

        this.router.navigate(['/']);

    }

}