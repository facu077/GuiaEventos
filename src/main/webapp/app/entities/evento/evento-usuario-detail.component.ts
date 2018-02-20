import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Evento } from './evento.model';
import { EventoService } from './evento.service';

import { Usuario, UsuarioService } from '../usuario';

import { Principal, AccountService } from '../../shared';
import { TagsService } from '../tags/tags.service';

@Component({
    selector: 'jhi-evento-usuario-detail',
    templateUrl: './evento-usuario-detail.component.html'
})
export class EventoUsuarioDetailComponent implements OnInit, OnDestroy {

    evento: Evento;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    userId: number;
    control: Boolean;
    controlFavorito: Boolean;
    usuario: Usuario;

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
        draggable: false
    }

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private eventoService: EventoService,
        private route: ActivatedRoute,
        private account: AccountService,
        private principal: Principal,
        private usuarioService: UsuarioService,
        private tagsService: TagsService
    ) {
    }

    ngOnInit() {
        this.control = true;
        this.controlFavorito = true;
        this.principal.identity().then((account) => {
            this.userId = account.id;
        });
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
        const [direccion, longitud, latitud] = this.evento.ubicacion.split(';');
        this.marcador.lat = +longitud;
        this.marcador.lng = +latitud;
        this.lat = +longitud;
        this.lng = +latitud;
        this.direccion = direccion;
    }

    isRegistrado() {
        this.control = false;
        return 'Ya estas registrado en este evento';
    }

    isFavorito() {
        this.controlFavorito = false;
        return 'Ya tienes el evento en favoritos';
    }

    registro() {
        this.eventoService.registroEvento(this.evento.id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'eventoListModification',
                content: 'Registrado un evento'
            });
            this.control = false;
            this.eliminarFavorito(this.evento.id);
            this.registerChangeInEventos();
        });
    }

    favorito() {
        this.eventoService.favoritoEvento(this.evento.id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'eventoListModification',
                content: 'Agregado a favoritos un evento'
            });
            this.controlFavorito = false;
            this.registerChangeInEventos();
        });
    }

    eliminarFavorito(id: number): void {
        this.eventoService.deleteFavorito(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'eventoListModification',
                content: 'Deleted an evento favorito'
            });
        });
        this.registerChangeInEventos()
    }

    agregarTag() {
        // console.log(this.evento.tags.length);
        for (let i = 0; i < this.evento.tags.length; i++) {
            this.tagsService.addTagsUsuario(this.evento.tags[i].id).subscribe((response) => {
                this.eventManager.broadcast({
                    name: 'eventoListModification',
                    content: 'Add tags'
                });
            });
        }
        alert('Tags agregados a tu lista!');
    }

}

interface Marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
}
