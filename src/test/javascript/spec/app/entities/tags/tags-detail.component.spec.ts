/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { TrabajoFinalTestModule } from '../../../test.module';
import { TagsDetailComponent } from '../../../../../../main/webapp/app/entities/tags/tags-detail.component';
import { TagsService } from '../../../../../../main/webapp/app/entities/tags/tags.service';
import { Tags } from '../../../../../../main/webapp/app/entities/tags/tags.model';

describe('Component Tests', () => {

    describe('Tags Management Detail Component', () => {
        let comp: TagsDetailComponent;
        let fixture: ComponentFixture<TagsDetailComponent>;
        let service: TagsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrabajoFinalTestModule],
                declarations: [TagsDetailComponent],
                providers: [
                    TagsService
                ]
            })
            .overrideTemplate(TagsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TagsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TagsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Tags(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tags).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
