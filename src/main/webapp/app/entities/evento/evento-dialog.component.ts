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

import { MouseEvent } from '@agm/core';

@Component({
    selector: 'jhi-evento-dialog',
    templateUrl: './evento-dialog.component.html',
})
export class EventoDialogComponent implements OnInit {

    evento: Evento;
    isSaving: boolean;

    categorias: Categoria[];

    usuarios: Usuario[];

    tags: Tags[];
    horarioDp: any;

    show: boolean;
    direccion: String;

    // google maps zoom level
    zoom: number = +12;

    // initial center position for the map
    lat: number = -32.8943;
    lng: number = -68.8341;

    marcador: Marker = {
        lat: -32.8943,
        lng: -68.8341,
        label: 'A',
        draggable: true
    }

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private eventoService: EventoService,
        private categoriaService: CategoriaService,
        private usuarioService: UsuarioService,
        private tagsService: TagsService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.show = false;
        this.isSaving = false;
        this.categoriaService.query()
            .subscribe((res: ResponseWrapper) => { this.categorias = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.usuarioService.query()
            .subscribe((res: ResponseWrapper) => { this.usuarios = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tagsService.query()
            .subscribe((res: ResponseWrapper) => { this.tags = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.buildMap();
    }

    buildMap() {
        const [direccion, longitud, latitud] = this.evento.ubicacion.split(';');
        this.marcador.lat = +longitud;
        this.marcador.lng = +latitud;
        this.lat = +longitud;
        this.lng = +latitud;
        this.direccion = direccion;
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

    trackUsuarioById(index: number, item: Usuario) {
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

    clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`)
    }

    mapClicked($event: MouseEvent) {
        this.marcador = {
          lat: $event.coords.lat,
          lng: $event.coords.lng,
          draggable: false
        }
        this.eventoService.getData(this.marcador.lat, this.marcador.lng).subscribe((data) => {
            this.evento.ubicacion = data.results[0].formatted_address + ';' + this.marcador.lat + ';' + this.marcador.lng;
            this.direccion = data.results[0].formatted_address;
        });
    }

    markerDragEnd(m: Marker, $event: MouseEvent) {
        console.log('dragEnd', m, $event);
    }

    showMap() {
        this.show = !this.show;
    }
}

interface Marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
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
