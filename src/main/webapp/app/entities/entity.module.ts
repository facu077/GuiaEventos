import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TrabajoFinalEventoModule } from './evento/evento.module';
import { TrabajoFinalTagsModule } from './tags/tags.module';
import { TrabajoFinalCategoriaModule } from './categoria/categoria.module';
import { TrabajoFinalUsuarioModule } from './usuario/usuario.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        TrabajoFinalEventoModule,
        TrabajoFinalTagsModule,
        TrabajoFinalCategoriaModule,
        TrabajoFinalUsuarioModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrabajoFinalEntityModule {}
