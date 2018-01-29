/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { TrabajoFinalTestModule } from '../../../test.module';
import { NotificacionesDetailComponent } from '../../../../../../main/webapp/app/entities/notificaciones/notificaciones-detail.component';
import { NotificacionesService } from '../../../../../../main/webapp/app/entities/notificaciones/notificaciones.service';
import { Notificaciones } from '../../../../../../main/webapp/app/entities/notificaciones/notificaciones.model';

describe('Component Tests', () => {

    describe('Notificaciones Management Detail Component', () => {
        let comp: NotificacionesDetailComponent;
        let fixture: ComponentFixture<NotificacionesDetailComponent>;
        let service: NotificacionesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrabajoFinalTestModule],
                declarations: [NotificacionesDetailComponent],
                providers: [
                    NotificacionesService
                ]
            })
            .overrideTemplate(NotificacionesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NotificacionesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NotificacionesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Notificaciones(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.notificaciones).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
