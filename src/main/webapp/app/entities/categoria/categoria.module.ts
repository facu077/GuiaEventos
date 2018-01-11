import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TrabajoFinalSharedModule } from '../../shared';
import {
    CategoriaService,
    CategoriaPopupService,
    CategoriaComponent,
    CategoriaDetailComponent,
    CategoriaDialogComponent,
    CategoriaPopupComponent,
    CategoriaDeletePopupComponent,
    CategoriaDeleteDialogComponent,
    categoriaRoute,
    categoriaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...categoriaRoute,
    ...categoriaPopupRoute,
];

@NgModule({
    imports: [
        TrabajoFinalSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CategoriaComponent,
        CategoriaDetailComponent,
        CategoriaDialogComponent,
        CategoriaDeleteDialogComponent,
        CategoriaPopupComponent,
        CategoriaDeletePopupComponent,
    ],
    entryComponents: [
        CategoriaComponent,
        CategoriaDialogComponent,
        CategoriaPopupComponent,
        CategoriaDeleteDialogComponent,
        CategoriaDeletePopupComponent,
    ],
    providers: [
        CategoriaService,
        CategoriaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrabajoFinalCategoriaModule {}
