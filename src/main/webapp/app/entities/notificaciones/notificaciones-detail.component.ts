import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Notificaciones } from './notificaciones.model';
import { NotificacionesService } from './notificaciones.service';

@Component({
    selector: 'jhi-notificaciones-detail',
    templateUrl: './notificaciones-detail.component.html'
})
export class NotificacionesDetailComponent implements OnInit, OnDestroy {

    notificaciones: Notificaciones;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private notificacionesService: NotificacionesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInNotificaciones();
    }

    load(id) {
        this.notificacionesService.find(id).subscribe((notificaciones) => {
            this.notificaciones = notificaciones;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInNotificaciones() {
        this.eventSubscriber = this.eventManager.subscribe(
            'notificacionesListModification',
            (response) => this.load(this.notificaciones.id)
        );
    }
}
