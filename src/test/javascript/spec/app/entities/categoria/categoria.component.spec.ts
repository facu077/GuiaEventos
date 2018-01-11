/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { TrabajoFinalTestModule } from '../../../test.module';
import { CategoriaComponent } from '../../../../../../main/webapp/app/entities/categoria/categoria.component';
import { CategoriaService } from '../../../../../../main/webapp/app/entities/categoria/categoria.service';
import { Categoria } from '../../../../../../main/webapp/app/entities/categoria/categoria.model';

describe('Component Tests', () => {

    describe('Categoria Management Component', () => {
        let comp: CategoriaComponent;
        let fixture: ComponentFixture<CategoriaComponent>;
        let service: CategoriaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrabajoFinalTestModule],
                declarations: [CategoriaComponent],
                providers: [
                    CategoriaService
                ]
            })
            .overrideTemplate(CategoriaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CategoriaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoriaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Categoria(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.categorias[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
