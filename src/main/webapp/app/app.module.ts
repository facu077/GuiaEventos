import './vendor.ts';

import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ngx-webstorage';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { TrabajoFinalSharedModule, UserRouteAccessService } from './shared';
import { TrabajoFinalAppRoutingModule} from './app-routing.module';
import { TrabajoFinalHomeModule } from './home/home.module';
import { TrabajoFinalAdminModule } from './admin/admin.module';
import { TrabajoFinalAccountModule } from './account/account.module';
import { TrabajoFinalEntityModule } from './entities/entity.module';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
import { SerPrestadorComponent } from './entities/usuario/serprestador.component'
import { TagsUsuarioComponent } from './entities/tags/tags-usuario.component';
import { TagsUsuarioDeletePopupComponent } from './entities/tags/tags-usuario-delete-dialog.component';
import { TagsUsuarioDeleteDialogComponent } from './entities/tags/tags-usuario-delete-dialog.component';
import { TagsUsuarioDialogComponent } from './entities/tags/tags-usuario-dialog.component';
import { TagsUsuarioPopupComponent } from './entities/tags/tags-usuario-dialog.component';
import { EventoUsuarioComponent } from './entities/evento/evento-usuario.component';
import { EventoUsuarioDialogComponent, EventoUsuarioPopupComponent } from './entities/evento/evento-usuario-dialog.component';
import { EventoUsuarioDetailComponent } from './entities/evento/evento-usuario-detail.component';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        AgmCoreModule.forRoot({
        apiKey: 'AIzaSyDUv635tYlaLjlECsrwe8LCMKreP4kwpzE'
        }),
        TrabajoFinalAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        TrabajoFinalSharedModule,
        TrabajoFinalHomeModule,
        TrabajoFinalAdminModule,
        TrabajoFinalAccountModule,
        TrabajoFinalEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent,
        SerPrestadorComponent,
        TagsUsuarioComponent,
        TagsUsuarioDeletePopupComponent,
        TagsUsuarioDeleteDialogComponent,
        TagsUsuarioDialogComponent,
        TagsUsuarioPopupComponent,
        EventoUsuarioComponent,
        EventoUsuarioDialogComponent,
        EventoUsuarioPopupComponent,
        EventoUsuarioDetailComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    entryComponents: [
        TagsUsuarioDeleteDialogComponent,
        TagsUsuarioDialogComponent,
        EventoUsuarioDialogComponent
    ],
    bootstrap: [ JhiMainComponent ]
})
export class TrabajoFinalAppModule {}
