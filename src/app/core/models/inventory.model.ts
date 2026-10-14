export interface InventoryMovement{

    id?:number;

    producto_id:number;

    tipo:'ENTRADA'|'SALIDA';

    cantidad:number;

    stock_anterior?:number;

    stock_nuevo?:number;

    observacion:string;

    createdAt?:string;

    updatedAt?:string;

}