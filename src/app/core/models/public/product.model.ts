export interface CategoriaProductos{

    id:number;

    nombre:string;

    descripcion:string;

    productos:Producto[];

}

export interface Producto{

    id:number;

    nombre:string;

    descripcion:string;

    precio_compra:number;

    precio_venta:number;

    stock:number;

    categoria_id:number;

    fotos:any[];

}