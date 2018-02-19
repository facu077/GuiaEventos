import { BaseEntity } from './../../shared';

export class Evento implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public resumen?: any,
        public descripcion?: any,
        public precio?: number,
        public ubicacion?: string,
        public fecha?: any,
        public hora?: string,
        public imagenesContentType?: string,
        public imagenes?: any,
        public destacado?: boolean,
        public estado?: boolean,
        public categoria?: BaseEntity,
        public usuarioCreador?: BaseEntity,
        public tags?: BaseEntity[],
        public usuarioRegistrados?: BaseEntity[],
        public usuarioFavoritos?: BaseEntity[],
    ) {
        this.destacado = false;
        this.estado = false;
        this.ubicacion = 'Seleccione una ubicacion;-32.89;-68.83';
    }
}
