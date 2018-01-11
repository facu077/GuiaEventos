import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TagsComponent } from './tags.component';
import { TagsDetailComponent } from './tags-detail.component';
import { TagsPopupComponent } from './tags-dialog.component';
import { TagsDeletePopupComponent } from './tags-delete-dialog.component';

export const tagsRoute: Routes = [
    {
        path: 'tags',
        component: TagsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tags'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tags/:id',
        component: TagsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tags'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tagsPopupRoute: Routes = [
    {
        path: 'tags-new',
        component: TagsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tags'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tags/:id/edit',
        component: TagsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tags'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tags/:id/delete',
        component: TagsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tags'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];