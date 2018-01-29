/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TrabajoFinalTestModule } from '../../../test.module';
import { NotificacionesDialogComponent } from '../../../../../../main/webapp/app/entities/notificaciones/notificaciones-dialog.component';
import { NotificacionesService } from '../../../../../../main/webapp/app/entities/notificaciones/notificaciones.service';
import { Notificaciones } from '../../../../../../main/webapp/app/entities/notificaciones/notificaciones.model';
import { UsuarioService } from '../../../../../../main/webapp/app/entities/usuario';

describe('Component Tests', () => {

    describe('Notificaciones Management Dialog Component', () => {
        let comp: NotificacionesDialogComponent;
        let fixture: ComponentFixture<NotificacionesDialogComponent>;
        let service: NotificacionesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrabajoFinalTestModule],
                declarations: [NotificacionesDialogComponent],
                providers: [
                    UsuarioService,
                    NotificacionesService
                ]
            })
            .overrideTemplate(NotificacionesDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NotificacionesDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NotificacionesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Notificaciones(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.notificaciones = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'notificacionesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Notificaciones();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.notificaciones = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'notificacionesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
