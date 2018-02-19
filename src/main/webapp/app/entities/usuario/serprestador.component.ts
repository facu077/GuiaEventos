import { Component, OnInit } from '@angular/core';

import { Principal, AccountService, UserService } from '../../shared';

@Component({
    selector: 'jhi-settings',
    templateUrl: './serprestador.component.html'
})
export class SerPrestadorComponent implements OnInit {
    error: string;
    success: string;
    settingsAccount: any;
    languages: any[];
    authorities: any[]
    control: boolean;

    constructor(
        private account: AccountService,
        private principal: Principal,
        private userService: UserService
    ) {
        this.control = false;
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.settingsAccount = this.copyAccount(account);
            this.authorities = [];
            this.userService.authorities().subscribe((authorities) => {
            this.authorities = authorities;
            this.settingsAccount.authorities.push('ROLE_PRESTADOR');
            });
        });
    }

    save() {
        this.account.addRolePrestador(this.settingsAccount).subscribe(() => {
            this.error = null;
            this.success = 'OK';
            this.principal.identity(true).then((account) => {
                this.settingsAccount = this.copyAccount(account);
            });
        }, () => {
            this.success = null;
            this.error = 'ERROR';
        });
    }

    isPrestador(authorities) {
        for (let i = 0; i < authorities.length; i++) {
            console.log(authorities[i]);
            if (authorities[i].toString() === 'ROLE_PRESTADOR') {
                this.control = true;
            }
        }
    }

    copyAccount(account) {
        this.isPrestador(account.authorities);
        return {
            id: account.id,
            activated: account.activated,
            email: account.email,
            firstName: account.firstName,
            langKey: account.langKey,
            lastName: account.lastName,
            login: account.login,
            imageUrl: account.imageUrl,
            authorities: account.authorities
        };
    }
}
