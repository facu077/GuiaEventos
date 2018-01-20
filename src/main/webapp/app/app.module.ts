import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ngx-webstorage';

import { TrabajoFinalSharedModule, UserRouteAccessService } from './shared';
import { TrabajoFinalAppRoutingModule} from './app-routing.module';
import { TrabajoFinalHomeModule } from './home/home.module';
import { TrabajoFinalAdminModule } from './admin/admin.module';
import { TrabajoFinalAccountModule } from './account/account.module';
import { TrabajoFinalEntityModule } from './entities/entity.module';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
import { TagsUsuarioComponent } from './entities/tags/tags-usuario.component';

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
        TagsUsuarioComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class TrabajoFinalAppModule {}
