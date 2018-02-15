import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ActivatedRoute } from '@angular/router';

import { Evento } from './evento.model';
import { EventoService } from './evento.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-evento-populares',
    templateUrl: './evento-populares.component.html',
})
export class EventoPopularesComponent implements OnInit, OnDestroy {

    eventos: Evento[];
    evento: Evento;
    currentAccount: any;
    eventSubscriber: Subscription;
    itemsPerPage: number;
    links: any;
    page: any;
    predicate: any;
    queryCount: any;
    reverse: any;
    totalItems: number;
    limite: boolean;

    constructor(
        private eventoService: EventoService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private parseLinks: JhiParseLinks,
        private principal: Principal,
        private activatedRoute: ActivatedRoute
    ) {
        this.eventos = [];
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.predicate = 'id';
        this.reverse = true;
        this.limite = true;
    }

    loadAll() {
        this.eventoService.query({
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
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
    ngOnInit() {
        this.loadAll();
        if (this.activatedRoute.snapshot.params['control'] === undefined) {
            this.limite = true;
        } else {
            this.limite = false;
        }
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

    private onSuccess(data, headers) {
        let control = 0;
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        for (let i = 0; i < data.length; i++) {
            if ( data[i].usuarioRegistrados.length >= 3 && data[i].estado === true ) {
                if (control < 4 && this.limite) {
                    this.eventos.push(data[i]);
                } else if (!this.limite) {
                    this.eventos.push(data[i]);
                }
                control++;
            }
        }
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
