import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Notificaciones } from './notificaciones.model';
import { NotificacionesPopupService } from './notificaciones-popup.service';
import { NotificacionesService } from './notificaciones.service';

@Component({
    selector: 'jhi-notificaciones-delete-dialog',
    templateUrl: './notificaciones-delete-dialog.component.html'
})
export class NotificacionesDeleteDialogComponent {

    notificaciones: Notificaciones;

    constructor(
        private notificacionesService: NotificacionesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.notificacionesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'notificacionesListModification',
                content: 'Deleted an notificaciones'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-notificaciones-delete-popup',
    template: ''
})
export class NotificacionesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private notificacionesPopupService: NotificacionesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.notificacionesPopupService
                .open(NotificacionesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
