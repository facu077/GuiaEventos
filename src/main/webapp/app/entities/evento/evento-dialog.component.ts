import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Evento } from './evento.model';
import { EventoPopupService } from './evento-popup.service';
import { EventoService } from './evento.service';
import { Categoria, CategoriaService } from '../categoria';
import { Tags, TagsService } from '../tags';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-evento-dialog',
    templateUrl: './evento-dialog.component.html'
})
export class EventoDialogComponent implements OnInit {

    evento: Evento;
    isSaving: boolean;

    categorias: Categoria[];

    tags: Tags[];
    horarioDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private eventoService: EventoService,
        private categoriaService: CategoriaService,
        private tagsService: TagsService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.categoriaService.query()
            .subscribe((res: ResponseWrapper) => { this.categorias = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tagsService.query()
            .subscribe((res: ResponseWrapper) => { this.tags = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
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
        if (this.evento.id !== undefined) {
            this.subscribeToSaveResponse(
                this.eventoService.update(this.evento));
        } else {
            this.subscribeToSaveResponse(
                this.eventoService.create(this.evento));
        }
    }

    private subscribeToSaveResponse(result: Observable<Evento>) {
        result.subscribe((res: Evento) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Evento) {
        this.eventManager.broadcast({ name: 'eventoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCategoriaById(index: number, item: Categoria) {
        return item.id;
    }

    trackTagsById(index: number, item: Tags) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-evento-popup',
    template: ''
})
export class EventoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private eventoPopupService: EventoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.eventoPopupService
                    .open(EventoDialogComponent as Component, params['id']);
            } else {
                this.eventoPopupService
                    .open(EventoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
