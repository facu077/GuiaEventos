import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TrabajoFinalSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';
import { EventoPopularesComponent } from '../entities/evento/evento-populares.component';
import { EventoDestacadosComponent } from '../entities/evento/evento-destacados.component';
import { EventoDiaComponent } from '../entities/evento/evento-dia.component';

@NgModule({
    imports: [
        TrabajoFinalSharedModule,
        RouterModule.forChild([ HOME_ROUTE ])
    ],
    declarations: [
        HomeComponent,
        EventoPopularesComponent,
        EventoDestacadosComponent,
        EventoDiaComponent
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrabajoFinalHomeModule {}
