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

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [TransitProvider],
})

export class HomePage {

  constructor(public navCtrl: NavController,
    private _storage: Storage,
    private _jwtHelper: JwtHelperService,
    private _transitProvider: TransitProvider,
    private _toast: ToastController) {
    this.init();
  }

  user: User = new User();
  transits = [];

  init() {
    this.getNome();
  }

  getNome() {
    this._storage.get('token').then((val) => {
      var decodedToken = this._jwtHelper.decodeToken(val);
      if (decodedToken.user)
        this.user = decodedToken.user;
      this._transitProvider.list(this.user._id).subscribe(res => {
        this.transits = res.data;
      }, error => {
        console.log(error);
        let toast = this._toast.create({
          message: error.error.text,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      })
    });
  }

  logout() {
    this._storage.clear();
    this.navCtrl.pop();
  }

  QrCode() {
    this.navCtrl.push(QrcodePage);
  }

}
