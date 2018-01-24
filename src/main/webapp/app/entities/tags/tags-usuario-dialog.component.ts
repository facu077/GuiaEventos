import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tags } from './tags.model';
import { TagsPopupService } from './tags-popup.service';
import { TagsService } from './tags.service';

import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tags-usuario-dialog',
    templateUrl: './tags-usuario-dialog.component.html'
})
export class TagsUsuarioDialogComponent implements OnInit {

    tags: Tags[];
    isSaving: boolean;

    constructor(
        private jhiAlertService: JhiAlertService,
        public activeModal: NgbActiveModal,
        private tagsService: TagsService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tagsService.query()
            .subscribe((res: ResponseWrapper) => { this.tags = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    save(id: number) {
        this.tagsService.addTagsUsuario(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tagsListModification',
                content: 'Deleted an tags'
            });
            this.activeModal.dismiss(true);
        });
    }

    trackTagsById(index: number, item: Tags) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-tags-usuario-popup',
    template: ''
})
export class TagsUsuarioPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tagsPopupService: TagsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tagsPopupService
                    .open(TagsUsuarioDialogComponent as Component, params['id']);
            } else {
                this.tagsPopupService
                    .open(TagsUsuarioDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
