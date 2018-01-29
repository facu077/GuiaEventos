import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Notificaciones } from './notificaciones.model';
import { NotificacionesService } from './notificaciones.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-notificaciones',
    templateUrl: './notificaciones.component.html'
})
export class NotificacionesComponent implements OnInit, OnDestroy {
notificaciones: Notificaciones[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private notificacionesService: NotificacionesService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.notificacionesService.query().subscribe(
            (res: ResponseWrapper) => {
                this.notificaciones = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInNotificaciones();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Notificaciones) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInNotificaciones() {
        this.eventSubscriber = this.eventManager.subscribe('notificacionesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
