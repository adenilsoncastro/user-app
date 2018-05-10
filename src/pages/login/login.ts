import { RegisterPage } from './../register/register';
import { LoginProvider } from './../../providers/login/login';
import { HomePage } from './../home/home';
import { LoginModel } from './../../models/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { ToastController } from 'ionic-angular';
import { JwtHelperService } from '@auth0/angular-jwt';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public _loginProvider: LoginProvider,
    private _toast: ToastController,
    private _storage: Storage,
    private _jwtHelper: JwtHelperService) {
  }

  loginModel: LoginModel = new LoginModel();

  onClick() {
    this.navCtrl.push(HomePage);
  }

  loginClick() {
    this._loginProvider.login(this.loginModel).subscribe(res => {
      
      const decodedToken = this._jwtHelper.decodeToken(res.token);
      const expirationDate = this._jwtHelper.getTokenExpirationDate(res.token);
      const isExpired = this._jwtHelper.isTokenExpired(res.token);

      this.loginModel = new LoginModel();
      this.loginModel.username = "";
      this.loginModel.password = "";
      this._storage.set('token', res.token);

      let toast = this._toast.create({
        message: 'Autenticação realizada com sucesso! Bem vindo(a), ' + decodedToken.user.name,
        duration: 3000,
        position: 'bottom'
      }).present();
      
      this.navCtrl.push(HomePage);

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

  registerClick() {
    this.navCtrl.push(RegisterPage);
  }

  isFormValid() {
    if (!this.loginModel)
      return false;

    if (!this.loginModel.username || !this.loginModel.password)
      return false;

    return this.loginModel.username.length > 0 && this.loginModel.password.length > 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
