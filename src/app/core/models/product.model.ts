export interface Product{

    id?:number;

    nombre:string;

    descripcion:string|null;

    precio_compra:number;

    precio_venta:number;

    categoria_id:number;

    ficha_tecnica?:string|null;

    manual_usuario?:string|null;

    activo:boolean;

    stock?:number;

    categoria?:{

        id:number;

        nombre:string;

    };

    createdAt?:string;

    updatedAt?:string;

}