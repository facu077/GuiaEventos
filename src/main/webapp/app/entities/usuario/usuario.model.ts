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
        public prestador?: boolean,
        public user?: User,
        public eventos?: BaseEntity[],
        public tags?: BaseEntity[],
    ) {
        this.prestador = false;
    }
}
