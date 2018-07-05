import { RegisterPage } from './../register/register';
import { LoginProvider } from './../../providers/login/login';
import { HomePage } from './../home/home';
import { LoginModel } from './../../models/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { ToastController } from 'ionic-angular';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoadingController } from 'ionic-angular';

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
    private _jwtHelper: JwtHelperService,
    public loadingCtrl: LoadingController) {
  }

  loginModel: LoginModel = new LoginModel();

  onClick() {
    this.navCtrl.push(HomePage);
  }

  loginClick() {

    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Aguarde...'
    });

    loading.present();

    this._loginProvider.login(this.loginModel).subscribe(res => {
      if (res.success == false) {
        res.error.forEach(element => {
          this._toast.create({
            message: element.msg,
            duration: 3000,
            position: 'bottom'
          }).present();
        });
        loading.dismiss();
        return;
      }

      const decodedToken = this._jwtHelper.decodeToken(res.token);
      const expirationDate = this._jwtHelper.getTokenExpirationDate(res.token);
      const isExpired = this._jwtHelper.isTokenExpired(res.token);

      this.loginModel = new LoginModel();
      this.loginModel.username = "";
      this.loginModel.password = "";
      this.loginModel.usertype = 1;
      this._storage.set('token', res.token).then(() => {
        this.navCtrl.push(HomePage);
      });
      loading.dismiss();
    }, error => {
      console.log(error);

      var errorMsg = "";

      if (error.error.text) {
        errorMsg = error.error.text;
      } else {
        errorMsg = error.message;
      }

      let toast = this._toast.create({
        message: "Ocorreu um erro ao se comunicar com o servidor",
        duration: 3000,
        position: 'bottom'
      });
      loading.dismiss();
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
