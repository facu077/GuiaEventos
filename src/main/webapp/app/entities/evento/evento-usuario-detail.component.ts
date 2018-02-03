import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Evento } from './evento.model';
import { EventoService } from './evento.service';

@Component({
    selector: 'jhi-evento-usuario-detail',
    templateUrl: './evento-usuario-detail.component.html'
})
export class EventoUsuarioDetailComponent implements OnInit, OnDestroy {

    evento: Evento;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    // google maps zoom level
    zoom: number = +12;

    // initial center position for the map
    lat: number = -32.8943;
    lng: number = -68.8341;

    marcador: Marker = {
        lat: -32.8943,
        lng: -68.8341,
        label: 'A',
        draggable: false
    }

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private eventoService: EventoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEventos();
    }

    load(id) {
        this.eventoService.find(id).subscribe((evento) => {
            this.evento = evento;
            this.buildMap();
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

    registerChangeInEventos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'eventoListModification',
            (response) => this.load(this.evento.id)
        );
    }

    clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`)
    }

    markerDragEnd(m: Marker, $event: MouseEvent) {
        console.log('dragEnd', m, $event);
    }

    buildMap() {
        console.log('jajajajajajajjajajajajaja');
        console.log(this.evento.ubicacion);
        const [longitud, latitud] = this.evento.ubicacion.split(';');
        this.marcador.lat = +longitud;
        this.marcador.lng = +latitud;
        this.lat = +longitud;
        this.lng = +latitud;
    }
}

interface Marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
}
