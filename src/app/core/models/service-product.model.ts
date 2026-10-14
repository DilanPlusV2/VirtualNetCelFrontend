import { Product } from './product.model';

export interface ServiceProduct{

    id?:number;

    servicio_realizado_id:number;

    producto_id:number;

    cantidad_utilizada:number;

    producto?:Product;

}