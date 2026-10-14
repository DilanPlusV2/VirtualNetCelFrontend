import { Injectable, inject, PLATFORM_ID } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { isPlatformBrowser } from '@angular/common';

import { Observable, tap } from 'rxjs';

import { LoginRequest } from '../models/login-request.model';

import { LoginResponse } from '../models/login-response.model';

@Injectable({

    providedIn:'root'

})

export class AuthService{

    private platformId = inject(PLATFORM_ID);

    private http=inject(HttpClient);

    private api='http://localhost:3000/api/auth';

    login(data:LoginRequest):Observable<LoginResponse>{

        return this.http.post<LoginResponse>(

            `${this.api}/login`,

            data

        ).pipe(

            tap(response=>{

    if(isPlatformBrowser(this.platformId)){

        localStorage.setItem(
            'token',
            response.token
        );

        localStorage.setItem(
            'user',
            JSON.stringify(response.user)
        );

    }

})
        );

    }

    logout(){

    if(isPlatformBrowser(this.platformId)){

        localStorage.removeItem('token');

        localStorage.removeItem('user');

    }

}

    getToken(){

    if(!isPlatformBrowser(this.platformId))

        return null;

    return localStorage.getItem('token');

}

    getUser(){

    if(!isPlatformBrowser(this.platformId))

        return null;

    const user=

        localStorage.getItem('user');

    return user

        ? JSON.parse(user)

        : null;

}

    isLoggedIn(){

    return this.getToken()!=null;

}

}