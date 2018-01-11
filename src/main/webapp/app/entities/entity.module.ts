import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TrabajoFinalEventoModule } from './evento/evento.module';
import { TrabajoFinalTagsModule } from './tags/tags.module';
import { TrabajoFinalCategoriaModule } from './categoria/categoria.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        TrabajoFinalEventoModule,
        TrabajoFinalTagsModule,
        TrabajoFinalCategoriaModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrabajoFinalEntityModule {}
