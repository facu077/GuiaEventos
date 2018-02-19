import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Notificaciones } from './notificaciones.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class NotificacionesService {

    private resourceUrl =  SERVER_API_URL + 'api/notificaciones';
    private resourceUrlUsuario =  SERVER_API_URL + 'api/notificaciones-usuario';

    constructor(private http: Http) { }

    create(notificaciones: Notificaciones): Observable<Notificaciones> {
        const copy = this.convert(notificaciones);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(notificaciones: Notificaciones): Observable<Notificaciones> {
        const copy = this.convert(notificaciones);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Notificaciones> {
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

    queryUsuario(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrlUsuario, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
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
     * Convert a returned JSON object to Notificaciones.
     */
    private convertItemFromServer(json: any): Notificaciones {
        const entity: Notificaciones = Object.assign(new Notificaciones(), json);
        return entity;
    }

    /**
     * Convert a Notificaciones to a JSON which can be sent to the server.
     */
    private convert(notificaciones: Notificaciones): Notificaciones {
        const copy: Notificaciones = Object.assign({}, notificaciones);
        return copy;
    }
}
