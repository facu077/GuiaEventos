/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TrabajoFinalTestModule } from '../../../test.module';
import { TagsDialogComponent } from '../../../../../../main/webapp/app/entities/tags/tags-dialog.component';
import { TagsService } from '../../../../../../main/webapp/app/entities/tags/tags.service';
import { Tags } from '../../../../../../main/webapp/app/entities/tags/tags.model';
import { EventoService } from '../../../../../../main/webapp/app/entities/evento';
import { UsuarioService } from '../../../../../../main/webapp/app/entities/usuario';

describe('Component Tests', () => {

    describe('Tags Management Dialog Component', () => {
        let comp: TagsDialogComponent;
        let fixture: ComponentFixture<TagsDialogComponent>;
        let service: TagsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrabajoFinalTestModule],
                declarations: [TagsDialogComponent],
                providers: [
                    EventoService,
                    UsuarioService,
                    TagsService
                ]
            })
            .overrideTemplate(TagsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TagsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TagsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Tags(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.tags = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tagsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Tags();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.tags = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tagsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
