import { UserProvider } from './../../providers/user/user';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
    selector: 'page-alter',
    templateUrl: 'alter.html',
    providers: [UserProvider]
})

export class AlterPage {

    user: User = new User();
    form: FormGroup;

    constructor(public navCtrl: NavController,
        private _storage: Storage,
        private _jwtHelper: JwtHelperService,
        private toast: ToastController,
        private fb: FormBuilder,
        private userProvider: UserProvider) {
            
        this.form = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(150)]],
            email: ['', [Validators.required, Validators.email]],
            username: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(150)]],
            password: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(150)]],
            passwordConfirmation: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(150)]],
            marca: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(150)]],
            modelo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(150)]],
            placa: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(8), Validators.pattern(/[a-z]{3}-?\d{4}/)]],
        });

        this.init();
    }

    init() {
        this._storage.get('token').then((val) => {
            var decodedToken = this._jwtHelper.decodeToken(val);
            if (decodedToken.user)
              this.user = decodedToken.user;
              debugger
          });
    }

    comparePasswords() {
        if (!this.form)
            return false;
        return this.form.controls['password'].value == this.form.controls['passwordConfirmation'].value
    }

    registerClick() {
        this.userProvider.register(this.user).subscribe(res => {
            if (res.success == false) {

                res.error.forEach(element => {
                    this.toast.create({
                        message: element.msg,
                        duration: 3000,
                        position: 'bottom'
                    }).present();
                });

            } else {
                this.toast.create({
                    message: 'Usuário criado com sucesso',
                    duration: 3000,
                    position: 'bottom'
                }).present()
                    .then(() => {
                        this.goBackClick();
                    });
            }
            console.log(res);
        }, error => {
            this.toast.create({
                message: error.error.text,
                duration: 3000,
                position: 'bottom'
            }).present();
        })
    }

    goBackClick() {
        this.navCtrl.pop();
    }

}
