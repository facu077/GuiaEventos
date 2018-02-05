import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TrabajoFinalSharedModule } from '../../shared';
import {
    TagsService,
    TagsPopupService,
    TagsComponent,
    TagsDetailComponent,
    TagsDialogComponent,
    TagsPopupComponent,
    TagsDeletePopupComponent,
    TagsDeleteDialogComponent,
    tagsRoute,
    tagsPopupRoute,
    TagsUsuarioComponent,
    TagsUsuarioDeletePopupComponent,
    TagsUsuarioDeleteDialogComponent,
    TagsUsuarioDialogComponent,
    TagsUsuarioPopupComponent,
} from './';

const ENTITY_STATES = [
    ...tagsRoute,
    ...tagsPopupRoute,
];

@NgModule({
    imports: [
        TrabajoFinalSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TagsComponent,
        TagsDetailComponent,
        TagsDialogComponent,
        TagsDeleteDialogComponent,
        TagsPopupComponent,
        TagsDeletePopupComponent,
        TagsUsuarioComponent,
        TagsUsuarioDeletePopupComponent,
        TagsUsuarioDeleteDialogComponent,
        TagsUsuarioDialogComponent,
        TagsUsuarioPopupComponent,
    ],
    entryComponents: [
        TagsComponent,
        TagsDialogComponent,
        TagsPopupComponent,
        TagsDeleteDialogComponent,
        TagsDeletePopupComponent,
        TagsUsuarioDeleteDialogComponent,
        TagsUsuarioDialogComponent,
    ],
    providers: [
        TagsService,
        TagsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrabajoFinalTagsModule {}
