import { UserProvider } from './../../providers/user/user';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from "@ionic/storage";
import { Car } from '../../models/car';
import { LoadingController } from 'ionic-angular';

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
        private userProvider: UserProvider,
        public loadingCtrl: LoadingController) {

        this.form = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(150)]],
            email: ['', [Validators.required, Validators.email]],
            username: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(150)]],
            password: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(150)]],
            passwordConfirmation: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(150)]],
            marca: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(150)]],
            modelo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(150)]],
            placa: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(8), Validators.pattern(/[A-Z]{3}-\d{4}/)]],
        });

        this.init();
    }

    init() {
        let loading = this.loadingCtrl.create({
            spinner: 'dots',
            content: 'Aguarde...'
          });
      
        loading.present();
        this._storage.get('token').then((val) => {
            var decodedToken = this._jwtHelper.decodeToken(val);
            if (decodedToken.user) {
                this.userProvider.get(decodedToken.user._id).subscribe(
                    res => {
                        loading.dismiss();
                        this.user = res.user;
                        this.user.car = new Car();
                        this.user.car.marca = res.user.marca;
                        this.user.car.modelo = res.user.modelo;
                        this.user.car.placa = res.user.placa;
                    },
                    error => {
                        loading.dismiss();
                        var errorMsg = "";

                        if (error.error.text) {
                            errorMsg = error.error.text;
                        } else {
                            errorMsg = error.message;
                        }

                        let toast = this.toast.create({
                            message: "Ocorreu um erro na comunicação com o servidor",
                            duration: 3000,
                            position: 'bottom'
                        });
                        toast.present();
                    })
            }
        });
    }

    comparePasswords() {
        if (!this.form)
            return false;
        return this.form.controls['password'].value == this.form.controls['passwordConfirmation'].value
    }

    alterClick() {
        let loading = this.loadingCtrl.create({
            spinner: 'dots',
            content: 'Aguarde...'
          });
      
        loading.present();
        this.user.usertype = 1;
        this.userProvider.update(this.user).subscribe(res => {
            if (res.success == false) {
                loading.dismiss();
                res.error.forEach(element => {
                    this.toast.create({
                        message: element.msg,
                        duration: 3000,
                        position: 'bottom'
                    }).present();
                });

            } else {
                loading.dismiss();
                this.toast.create({
                    message: 'Usuário alterado com sucesso',
                    duration: 3000,
                    position: 'bottom'
                }).present()
                    .then(() => {
                        this.goBackClick();
                    });
            }
            console.log(res);
        }, error => {
            loading.dismiss();
            this.toast.create({
                message: "Ocorreu um erro na comunicação com o servidor",
                duration: 3000,
                position: 'bottom'
            }).present();
        })
    }

    goBackClick() {
        this.navCtrl.pop();
    }
}
