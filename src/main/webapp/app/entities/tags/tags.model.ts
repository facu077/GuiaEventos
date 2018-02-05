import { BaseEntity } from './../../shared';

export class Tags implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public eventos?: BaseEntity[],
        public usuarios?: BaseEntity[],
    ) {
    }
}
