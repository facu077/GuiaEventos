import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EventoComponent } from './evento.component';
import { EventoDetailComponent } from './evento-detail.component';
import { EventoPopupComponent } from './evento-dialog.component';
import { EventoDeletePopupComponent } from './evento-delete-dialog.component';
import { EventoUsuarioComponent } from './evento-usuario.component';
import { EventoUsuarioPopupComponent } from './evento-usuario-dialog.component';
import { EventoUsuarioDetailComponent } from './evento-usuario-detail.component';
import { EventoBuscadorComponent } from './evento-buscador.component';

export const eventoRoute: Routes = [
    {
        path: 'evento',
        component: EventoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Eventos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'evento/:id',
        component: EventoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Eventos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'evento-usuario',
        component: EventoUsuarioComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Eventos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'evento-usuario/:id',
        component: EventoUsuarioDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Eventos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'evento-buscador',
        component: EventoBuscadorComponent,
        data: {
            // authorities: ['ROLE_USER'],
            pageTitle: 'Eventos'
        },
        canActivate: [UserRouteAccessService]
    }

];

export const eventoPopupRoute: Routes = [
    {
        path: 'evento-new',
        component: EventoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Eventos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'evento/:id/edit',
        component: EventoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Eventos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'evento/:id/delete',
        component: EventoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Eventos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'evento-usuario-new',
        component: EventoUsuarioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Eventos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'evento-usuario/:id/edit',
        component: EventoUsuarioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Eventos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
];
