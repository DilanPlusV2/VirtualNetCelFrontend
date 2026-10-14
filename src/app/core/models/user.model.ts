export interface User{

    id:number;

    nombre:string;

    email:string;

    password?:string;

    activo:boolean;

    ultimo_login?:string;

    createdAt?:string;

    updatedAt?:string;

}