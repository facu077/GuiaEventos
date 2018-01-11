import { BaseEntity } from './../../shared';

export class Evento implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public resumen?: any,
        public descripcion?: any,
        public precio?: number,
        public ubicacion?: string,
        public horario?: any,
        public imagenesContentType?: string,
        public imagenes?: any,
        public destacado?: boolean,
        public estado?: boolean,
        public categoria?: BaseEntity,
        public tags?: BaseEntity[],
    ) {
        this.destacado = false;
        this.estado = false;
    }
}
