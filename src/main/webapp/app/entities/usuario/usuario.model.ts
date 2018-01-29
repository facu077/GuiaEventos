import { BaseEntity, User } from './../../shared';

export const enum Sexo {
    'MASCULINO',
    'FEMENINO'
}

export class Usuario implements BaseEntity {
    constructor(
        public id?: number,
        public fechaNacimiento?: any,
        public sexo?: Sexo,
        public user?: User,
        public eventoRegistrados?: BaseEntity[],
        public eventoFavoritos?: BaseEntity[],
        public tags?: BaseEntity[],
    ) {
    }
}
