export interface DashboardCards {

    productos: number;

    categorias: number;

    servicios: number;

    blogs: number;

    inventario: number;

    instalaciones: number;

    mantenimientos: number;

    testimonios: number;

}

export interface UltimoServicio {

    id: number;

    cliente: string;

    tecnico: string | null;

    fecha: string;

    servicio: {

        id: number;

        nombre: string;

        tipo: string;

    };

}

export interface UltimoBlog {

    id: number;

    titulo: string;

    fecha_publicacion: string;

}

export interface DashboardCharts {

}

export interface DashboardStats {

    cards: DashboardCards;

    charts: DashboardCharts;

    ultimosServicios: UltimoServicio[];

    ultimosBlogs: UltimoBlog[];

}