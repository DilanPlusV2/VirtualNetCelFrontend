export interface CompletedService{

    id?:number;

    servicio_id:number;

    cliente:string;

    empresa?:string;

    telefono?:string;

    direccion?:string;

    ciudad?:string;

    tecnico?:string;

    fecha:string;

    observaciones?:string;

    testimonio?:string;

    valor_cobrado?:number;

    descontar_inventario?:boolean;

    estado?:string;

}