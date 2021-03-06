import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Evento } from './evento.model';
import { EventoService } from './evento.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-evento-buscador',
    templateUrl: './evento-buscador.component.html'
})
export class EventoBuscadorComponent implements OnInit, OnDestroy {

    eventos: Evento[];
    eventosTemp: Evento[];
    currentAccount: any;
    eventSubscriber: Subscription;
    itemsPerPage: number;
    links: any;
    page: any;
    predicate: any;
    queryCount: any;
    reverse: any;
    totalItems: number;
    currentSearch: string;
    buscadorHidden: boolean;

    queryAvanzado: QueryAvanzado = {
        nombre: '',
        resumen: '',
        ubicacion: '',
        fecha: '',
        categoria: '',
        tag: ''
    }

    constructor(
        private eventoService: EventoService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private parseLinks: JhiParseLinks,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.buscadorHidden = true;
        this.eventos = [];
        this.eventosTemp = [];
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.predicate = 'id';
        this.reverse = true;
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.eventoService.search({
                query: this.currentSearch,
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
                (res: ResponseWrapper) => this.onError(res.json)
            );
            return;
        }
        this.eventoService.query({
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json),
        );
    }

    reset() {
        this.page = 0;
        this.eventos = [];
        this.loadAll();
    }

    loadPage(page) {
        this.page = page;
        this.loadAll();
    }

    clear() {
        this.eventos = [];
        this.links = {
            last: 0
        };
        this.queryAvanzado = {
            nombre: '',
            resumen: '',
            ubicacion: '',
            fecha: '',
            categoria: '',
            tag: ''
        }
        this.page = 0;
        this.predicate = 'id';
        this.reverse = true;
        this.currentSearch = '';
        this.buscadorHidden = true;
        this.loadAll();
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.eventos = [];
        this.eventosTemp = [];
        this.links = {
            last: 0
        };
        this.page = 0;
        this.predicate = '_score';
        this.reverse = false;
        this.currentSearch = query;
        this.loadAll();
    }

    searchAvanzado(query) {
        let control = false;
        if (!query) {
            return this.clear();
        }
        this.eventos = [];
        this.eventosTemp = [];
        this.links = {
            last: 0
        };
        this.page = 0;
        this.predicate = '_score';
        this.reverse = false;
        this.currentSearch = '';
        if (query.fecha) {
            if (!control) {
                this.currentSearch = this.currentSearch + ' Fecha:' + query.fecha;
                control = true;
            } else {
                this.currentSearch = this.currentSearch + ' AND Fecha:' + query.fecha;
            }
        }
        if (query.nombre) {
            if (!control) {
                this.currentSearch = this.currentSearch + ' nombre:' + query.nombre;
                control = true;
            } else {
                this.currentSearch = this.currentSearch + ' AND nombre:' + query.nombre;
            }
        }
        if (query.resumen) {
            if (!control) {
                this.currentSearch = this.currentSearch + ' resumen:' + query.resumen;
                control = true;
            } else {
                this.currentSearch = this.currentSearch + ' AND resumen:' + query.resumen;
            }
        }
        if (query.ubicacion) {
            if (!control) {
                this.currentSearch = this.currentSearch + ' ubicacion:' + query.ubicacion;
                control = true;
            } else {
                this.currentSearch = this.currentSearch + ' AND ubicacion:' + query.ubicacion;
            }
        }
        if (query.categoria) {
            if (!control) {
                this.currentSearch = this.currentSearch + ' categoria.nombre:' + query.categoria;
                control = true;
            } else {
                this.currentSearch = this.currentSearch + ' AND categoria.nombre:' + query.categoria;
            }
        }
        if (query.tag) {
            if (!control) {
                this.currentSearch = this.currentSearch + ' tags.nombre:' + query.tag;
                control = true;
            } else {
                this.currentSearch = this.currentSearch + ' AND tags.nombre:' + query.tag;
            }
        }
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEventos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Evento) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInEventos() {
        this.eventSubscriber = this.eventManager.subscribe('eventoListModification', (response) => this.reset());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    showBuscador() {
        this.buscadorHidden = !this.buscadorHidden;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        for (let i = 0; i < data.length; i++) {
            this.eventoService.find(data[i].id).subscribe((evento) => {
                if (evento.estado) {
                    const [direccion, longitud, latitud] = evento.ubicacion.split(';');
                    evento.ubicacion = direccion;
                    this.eventos.push(evento);
                }
            });
        }
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

interface QueryAvanzado {
    nombre: String;
    resumen: String;
    ubicacion: String;
    fecha: String;
    categoria: String;
    tag: String;
}
