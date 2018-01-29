/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TrabajoFinalTestModule } from '../../../test.module';
import { NotificacionesDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/notificaciones/notificaciones-delete-dialog.component';
import { NotificacionesService } from '../../../../../../main/webapp/app/entities/notificaciones/notificaciones.service';

describe('Component Tests', () => {

    describe('Notificaciones Management Delete Component', () => {
        let comp: NotificacionesDeleteDialogComponent;
        let fixture: ComponentFixture<NotificacionesDeleteDialogComponent>;
        let service: NotificacionesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrabajoFinalTestModule],
                declarations: [NotificacionesDeleteDialogComponent],
                providers: [
                    NotificacionesService
                ]
            })
            .overrideTemplate(NotificacionesDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NotificacionesDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NotificacionesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
