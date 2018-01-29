/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { TrabajoFinalTestModule } from '../../../test.module';
import { NotificacionesComponent } from '../../../../../../main/webapp/app/entities/notificaciones/notificaciones.component';
import { NotificacionesService } from '../../../../../../main/webapp/app/entities/notificaciones/notificaciones.service';
import { Notificaciones } from '../../../../../../main/webapp/app/entities/notificaciones/notificaciones.model';

describe('Component Tests', () => {

    describe('Notificaciones Management Component', () => {
        let comp: NotificacionesComponent;
        let fixture: ComponentFixture<NotificacionesComponent>;
        let service: NotificacionesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrabajoFinalTestModule],
                declarations: [NotificacionesComponent],
                providers: [
                    NotificacionesService
                ]
            })
            .overrideTemplate(NotificacionesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NotificacionesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NotificacionesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Notificaciones(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.notificaciones[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
