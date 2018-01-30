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
    ) {
        this.destacado = false;
        this.estado = false;
    }
}
