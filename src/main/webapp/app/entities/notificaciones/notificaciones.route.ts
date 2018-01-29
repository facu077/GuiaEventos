import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { NotificacionesComponent } from './notificaciones.component';
import { NotificacionesDetailComponent } from './notificaciones-detail.component';
import { NotificacionesPopupComponent } from './notificaciones-dialog.component';
import { NotificacionesDeletePopupComponent } from './notificaciones-delete-dialog.component';

export const notificacionesRoute: Routes = [
    {
        path: 'notificaciones',
        component: NotificacionesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Notificaciones'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'notificaciones/:id',
        component: NotificacionesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Notificaciones'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const notificacionesPopupRoute: Routes = [
    {
        path: 'notificaciones-new',
        component: NotificacionesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Notificaciones'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'notificaciones/:id/edit',
        component: NotificacionesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Notificaciones'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'notificaciones/:id/delete',
        component: NotificacionesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Notificaciones'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
