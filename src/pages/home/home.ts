import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  login: String;
  password: String;

  constructor(public navCtrl: NavController) {

  }

  onClick() {
    this.navCtrl.push(LoginPage);
  }

  loginClick() {
    debugger;
    console.log(this.login);
    console.log(this.password);
  }

}
