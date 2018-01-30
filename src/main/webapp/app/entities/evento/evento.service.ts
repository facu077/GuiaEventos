import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Evento } from './evento.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EventoService {

    private resourceUrl =  SERVER_API_URL + 'api/eventos';
    private resourceUrlUsuario = SERVER_API_URL + 'api/eventos-usuario';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(evento: Evento): Observable<Evento> {
        const copy = this.convert(evento);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(evento: Evento): Observable<Evento> {
        const copy = this.convert(evento);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Evento> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    queryUsuario(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrlUsuario, options)
            .map((res: Response) => this.convertResponse(res));
    }

    createUsuario(evento: Evento): Observable<Evento> {
        const copy = this.convert(evento);
        return this.http.post(this.resourceUrlUsuario, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Evento.
     */
    private convertItemFromServer(json: any): Evento {
        const entity: Evento = Object.assign(new Evento(), json);
        entity.fecha = this.dateUtils
            .convertLocalDateFromServer(json.fecha);
        return entity;
    }

    /**
     * Convert a Evento to a JSON which can be sent to the server.
     */
    private convert(evento: Evento): Evento {
        const copy: Evento = Object.assign({}, evento);
        copy.fecha = this.dateUtils
            .convertLocalDateToServer(evento.fecha);
        return copy;
    }
}
