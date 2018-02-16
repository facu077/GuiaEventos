import { Component, OnInit } from '@angular/core';

import { Principal, AccountService } from '../../shared';

import { Observable } from 'rxjs/Observable';

import { UsuarioService } from '../../entities/usuario/usuario.service';
import { Usuario } from '../../entities/usuario/usuario.model';

@Component({
    selector: 'jhi-settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
    error: string;
    success: string;
    settingsAccount: any;
    languages: any[];
    usuario: Usuario;
    fechaNacimientoDp: any;

    constructor(
        private account: AccountService,
        private usuarioService: UsuarioService,
        private principal: Principal,
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.settingsAccount = this.copyAccount(account);
            this.usuarioService.find(this.settingsAccount.id).subscribe((usuario) => {
                usuario.fechaNacimiento = {
                    year: usuario.fechaNacimiento.getFullYear(),
                    month: usuario.fechaNacimiento.getMonth() + 1,
                    day: usuario.fechaNacimiento.getDate()
                };
                this.usuario = usuario;
            });
        });
    }

    save() {
        this.account.save(this.settingsAccount).subscribe(() => {
            this.error = null;
            this.success = 'OK';
            this.principal.identity(true).then((account) => {
                this.settingsAccount = this.copyAccount(account);
            });
        }, () => {
            this.success = null;
            this.error = 'ERROR';
        });
        this.subscribeToSaveResponse(
            this.usuarioService.update(this.usuario));
    }

    private subscribeToSaveResponse(result: Observable<Usuario>) {
        result.subscribe((res: Usuario) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Usuario) {
    }

    private onSaveError() {
    }

    copyAccount(account) {
        console.log(account);
        return {
            id: account.id,
            activated: account.activated,
            email: account.email,
            firstName: account.firstName,
            langKey: account.langKey,
            lastName: account.lastName,
            login: account.login,
            imageUrl: account.imageUrl,
            // sexo: account.usuario.sexo
        };
    }
}
