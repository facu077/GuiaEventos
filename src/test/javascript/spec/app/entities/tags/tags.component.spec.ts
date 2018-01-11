/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { TrabajoFinalTestModule } from '../../../test.module';
import { TagsComponent } from '../../../../../../main/webapp/app/entities/tags/tags.component';
import { TagsService } from '../../../../../../main/webapp/app/entities/tags/tags.service';
import { Tags } from '../../../../../../main/webapp/app/entities/tags/tags.model';

describe('Component Tests', () => {

    describe('Tags Management Component', () => {
        let comp: TagsComponent;
        let fixture: ComponentFixture<TagsComponent>;
        let service: TagsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrabajoFinalTestModule],
                declarations: [TagsComponent],
                providers: [
                    TagsService
                ]
            })
            .overrideTemplate(TagsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TagsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TagsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Tags(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tags[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
