import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import { TrabajoFinalSharedModule } from '../../shared';
import {
    EventoService,
    EventoPopupService,
    EventoComponent,
    EventoDetailComponent,
    EventoDialogComponent,
    EventoPopupComponent,
    EventoDeletePopupComponent,
    EventoDeleteDialogComponent,
    eventoRoute,
    eventoPopupRoute,
    EventoUsuarioComponent,
    EventoUsuarioDialogComponent,
    EventoUsuarioPopupComponent,
    EventoUsuarioDetailComponent,
    EventoBuscadorComponent
} from './';

const ENTITY_STATES = [
    ...eventoRoute,
    ...eventoPopupRoute,
];

@NgModule({
    imports: [
        TrabajoFinalSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDUv635tYlaLjlECsrwe8LCMKreP4kwpzE'
            }),
    ],
    declarations: [
        EventoComponent,
        EventoDetailComponent,
        EventoDialogComponent,
        EventoDeleteDialogComponent,
        EventoPopupComponent,
        EventoDeletePopupComponent,
        EventoUsuarioComponent,
        EventoUsuarioDialogComponent,
        EventoUsuarioPopupComponent,
        EventoUsuarioDetailComponent,
        EventoBuscadorComponent
    ],
    entryComponents: [
        EventoComponent,
        EventoDialogComponent,
        EventoPopupComponent,
        EventoDeleteDialogComponent,
        EventoDeletePopupComponent,
        EventoUsuarioDialogComponent,
    ],
    providers: [
        EventoService,
        EventoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrabajoFinalEventoModule {}
