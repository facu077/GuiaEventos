import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Usuario } from './usuario.model';
import { UsuarioPopupService } from './usuario-popup.service';
import { UsuarioService } from './usuario.service';
import { User, UserService } from '../../shared';
import { Evento, EventoService } from '../evento';
import { Tags, TagsService } from '../tags';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-usuario-dialog',
    templateUrl: './usuario-dialog.component.html'
})
export class UsuarioDialogComponent implements OnInit {

    usuario: Usuario;
    isSaving: boolean;

    users: User[];

    eventos: Evento[];

    tags: Tags[];
    fechaNacimientoDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private usuarioService: UsuarioService,
        private userService: UserService,
        private eventoService: EventoService,
        private tagsService: TagsService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.eventoService.query()
            .subscribe((res: ResponseWrapper) => { this.eventos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tagsService.query()
            .subscribe((res: ResponseWrapper) => { this.tags = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
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

    private subscribeToSaveResponse(result: Observable<Usuario>) {
        result.subscribe((res: Usuario) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Usuario) {
        this.eventManager.broadcast({ name: 'usuarioListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackEventoById(index: number, item: Evento) {
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
    selector: 'jhi-usuario-popup',
    template: ''
})
export class UsuarioPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private usuarioPopupService: UsuarioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.usuarioPopupService
                    .open(UsuarioDialogComponent as Component, params['id']);
            } else {
                this.usuarioPopupService
                    .open(UsuarioDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
