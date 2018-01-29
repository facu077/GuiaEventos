import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TrabajoFinalSharedModule } from '../../shared';
import {
    NotificacionesService,
    NotificacionesPopupService,
    NotificacionesComponent,
    NotificacionesDetailComponent,
    NotificacionesDialogComponent,
    NotificacionesPopupComponent,
    NotificacionesDeletePopupComponent,
    NotificacionesDeleteDialogComponent,
    notificacionesRoute,
    notificacionesPopupRoute,
} from './';

const ENTITY_STATES = [
    ...notificacionesRoute,
    ...notificacionesPopupRoute,
];

@NgModule({
    imports: [
        TrabajoFinalSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        NotificacionesComponent,
        NotificacionesDetailComponent,
        NotificacionesDialogComponent,
        NotificacionesDeleteDialogComponent,
        NotificacionesPopupComponent,
        NotificacionesDeletePopupComponent,
    ],
    entryComponents: [
        NotificacionesComponent,
        NotificacionesDialogComponent,
        NotificacionesPopupComponent,
        NotificacionesDeleteDialogComponent,
        NotificacionesDeletePopupComponent,
    ],
    providers: [
        NotificacionesService,
        NotificacionesPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrabajoFinalNotificacionesModule {}
