import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from "@ionic/storage";
import { User } from './../../models/user';

@IonicPage()
@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html',
})
export class QrcodePage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private _toast: ToastController,
    private _jwtHelper: JwtHelperService,
    private _storage: Storage,) {
    this._toast.create({
      message: 'Posicione o aparelho na vertical, apresente o QR code gerado para a câmera e aguarde a autenticação',
      duration: 4000,
      position: 'middle'
    }).present();
    this.init()
  }

  user: User = new User();

  init(){
    this._storage.get('token').then((val) => {
      var decodedToken = this._jwtHelper.decodeToken(val);
      if(decodedToken.user)
        this.user = decodedToken.user;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrcodePage');
  }

}
