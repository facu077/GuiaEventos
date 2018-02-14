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
import { Usuario, UsuarioService } from '../usuario';
import { Tags, TagsService } from '../tags';
import { ResponseWrapper } from '../../shared';

import { Principal, AccountService } from '../../shared';

@Component({
    selector: 'jhi-evento-registro',
    templateUrl: './evento-registro.component.html'
})
export class EventoRegistroComponent implements OnInit {

    evento: Evento;
    isSaving: boolean;

    categorias: Categoria[];

    usuarios: Usuario[];
    usuario: Usuario;

    tags: Tags[];
    fechaDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private eventoService: EventoService,
        private categoriaService: CategoriaService,
        private usuarioService: UsuarioService,
        private tagsService: TagsService,
        private eventManager: JhiEventManager,
        private account: AccountService,
        private principal: Principal
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.categoriaService.query()
            .subscribe((res: ResponseWrapper) => { this.categorias = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.usuarioService.query()
            .subscribe((res: ResponseWrapper) => { this.usuarios = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tagsService.query()
            .subscribe((res: ResponseWrapper) => { this.tags = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.principal.identity().then((account) => {
            this.usuarioService.find(account.id).subscribe((usuario) => {
                this.usuario = usuario;
                this.usuario.eventoRegistrados.push(this.evento);
            });
        });
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.usuario.id !== undefined) {
            this.subscribeToSaveResponse(
                this.usuarioService.update(this.usuario));
        } else {
            this.subscribeToSaveResponse(
                this.usuarioService.create(this.usuario));
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

interface Marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
}

@Component({
    selector: 'jhi-usuario-evento-popup',
    template: ''
})
export class EventoRegistroPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private eventoPopupService: EventoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.eventoPopupService
                    .open(EventoRegistroComponent as Component, params['id']);
            } else {
                this.eventoPopupService
                    .open(EventoRegistroComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
