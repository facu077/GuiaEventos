import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Categoria } from './categoria.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CategoriaService {

    private resourceUrl =  SERVER_API_URL + 'api/categorias';

    constructor(private http: Http) { }

    create(categoria: Categoria): Observable<Categoria> {
        const copy = this.convert(categoria);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(categoria: Categoria): Observable<Categoria> {
        const copy = this.convert(categoria);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Categoria> {
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

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Categoria.
     */
    private convertItemFromServer(json: any): Categoria {
        const entity: Categoria = Object.assign(new Categoria(), json);
        return entity;
    }

    /**
     * Convert a Categoria to a JSON which can be sent to the server.
     */
    private convert(categoria: Categoria): Categoria {
        const copy: Categoria = Object.assign({}, categoria);
        return copy;
    }
}
