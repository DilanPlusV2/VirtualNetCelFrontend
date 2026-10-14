export interface Service{

    id?:number;

    nombre:string;

    descripcion:string;

    es_mantenimiento:boolean;

    tipo?:'INSTALACION'|
          'MANTENIMIENTO'|
          'REPARACION'|
          'VISITA_TECNICA'|
          'VENTA';

    precio_base:number;

    activo:boolean;

}