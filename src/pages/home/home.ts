import { TransitProvider } from './../../providers/transit/transit';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { NavController, IonicPage, Toast } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from "@ionic/storage";
import { QrcodePage } from '../qrcode/qrcode'
import { CommonModule } from '@angular/common';
import { ToastController } from 'ionic-angular';
import { AlterPage } from '../alter/alter';
import { UserProvider } from '../../providers/user/user';
import { Car } from '../../models/car';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [TransitProvider, UserProvider],
})

export class HomePage {

  constructor(public navCtrl: NavController,
    private _storage: Storage,
    private _jwtHelper: JwtHelperService,
    private _transitProvider: TransitProvider,
    private _toast: ToastController,
    private userProvider: UserProvider) {
    this.init();
  }

  user: User = new User();
  transits = [];
  countOfToday = 0;

  init() {
    this.getInfo();
  }

  getInfo() {
    this._storage.get('token').then((val) => {
      var decodedToken = this._jwtHelper.decodeToken(val);
      if (decodedToken.user) {
        this.userProvider.get(decodedToken.user._id).subscribe(
          res => {
            this.user = res.user;
            this.user.car = new Car();
            this.user.car.marca = res.user.marca;
            this.user.car.modelo = res.user.modelo;
            this.user.car.placa = res.user.placa;
            this.user.name = this.user.name.split(' ')[0];
          },
          error => {
            var errorMsg = "";

            if (error.error.text) {
              errorMsg = error.error.text;
            } else {
              errorMsg = error.message;
            }

            let toast = this._toast.create({
              message: "Ocorreu um erro na comunicação com o servidor",
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
          })

        this._transitProvider.list(this.user._id).subscribe(res => {
          this.transits = res.data;
          this.transits.forEach(item => {
            item.img = 'data:image/jpeg;base64,' + item.img
          })
        }, error => {
          console.log(error);
          let toast = this._toast.create({
            message: error.error.text,
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        })

        this._transitProvider.countOfToday(this.user._id).subscribe(res => {
          this.countOfToday = res.data;

          if (res.data == null)
            this.countOfToday = 0;

        }, error => {
            console.log(error);
            let toast = this._toast.create({
              message: error.error.text,
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
          })
      }
    });
  }

  ionViewDidEnter() {
    this.getInfo();
  }

  logout() {
    this._storage.clear();
    this.navCtrl.pop();
  }

  QrCode() {
    this.navCtrl.push(QrcodePage);
  }

  alter() {
    this.navCtrl.push(AlterPage);
  }

}
