import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Notificaciones } from './notificaciones.model';
import { NotificacionesPopupService } from './notificaciones-popup.service';
import { NotificacionesService } from './notificaciones.service';
import { Usuario, UsuarioService } from '../usuario';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-notificaciones-dialog',
    templateUrl: './notificaciones-dialog.component.html'
})
export class NotificacionesDialogComponent implements OnInit {

    notificaciones: Notificaciones;
    isSaving: boolean;

    usuarios: Usuario[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private notificacionesService: NotificacionesService,
        private usuarioService: UsuarioService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.usuarioService.query()
            .subscribe((res: ResponseWrapper) => { this.usuarios = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.notificaciones.id !== undefined) {
            this.subscribeToSaveResponse(
                this.notificacionesService.update(this.notificaciones));
        } else {
            this.subscribeToSaveResponse(
                this.notificacionesService.create(this.notificaciones));
        }
    }

    private subscribeToSaveResponse(result: Observable<Notificaciones>) {
        result.subscribe((res: Notificaciones) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Notificaciones) {
        this.eventManager.broadcast({ name: 'notificacionesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUsuarioById(index: number, item: Usuario) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-notificaciones-popup',
    template: ''
})
export class NotificacionesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private notificacionesPopupService: NotificacionesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.notificacionesPopupService
                    .open(NotificacionesDialogComponent as Component, params['id']);
            } else {
                this.notificacionesPopupService
                    .open(NotificacionesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
