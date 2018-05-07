import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})

export class RegisterPage {

  user: User = new User();
  form: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required,]],
      passwordConfirmation: ['', [Validators.required]],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      placa: ['', Validators.required],
    })
  }

  comparePasswords() {
    if(!this.form)
      return false;
    return this.form.controls['password'].value == this.form.controls['passwordConfirmation'].value
  }

  registerClick() {

  }

  goBackClick() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
