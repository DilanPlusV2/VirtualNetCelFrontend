export interface HomeResponse{

    estadisticas:{

        productos:number;

        categorias:number;

        servicios:number;

    };

    productosDestacados:any[];

    serviciosDestacados:any[];

    testimonios:any[];

}