import { User } from './../../models/user';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from "@ionic/storage";
import { QrcodePage } from '../qrcode/qrcode'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(public navCtrl: NavController,
    private _storage: Storage,
    private _jwtHelper: JwtHelperService) {
    this.init();
  }

  user: User = new User();

  init() {
    this.getNome();
  }

  getNome() {
    this._storage.get('token').then((val) => {
      var decodedToken = this._jwtHelper.decodeToken(val);
      if(decodedToken.user)
        this.user = decodedToken.user;
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
