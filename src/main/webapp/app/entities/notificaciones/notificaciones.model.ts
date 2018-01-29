import { BaseEntity } from './../../shared';

export class Notificaciones implements BaseEntity {
    constructor(
        public id?: number,
        public descripcion?: any,
        public usuario?: BaseEntity,
    ) {
    }
}
