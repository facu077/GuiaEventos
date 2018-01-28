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

    constructor(
        private account: AccountService,
        private principal: Principal,
        private userService: UserService
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.settingsAccount = this.copyAccount(account);
            this.authorities = [];
            this.userService.authorities().subscribe((authorities) => {
            this.authorities = authorities;
            this.settingsAccount.authorities.push('ROLE_PRESTADOR');
        });
            // this.settingsAccount = { authorities: ['uno', 'dos'] }
        });
        // this.settingsAccount = { firstName: 'pedrito' }
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

    copyAccount(account) {
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
