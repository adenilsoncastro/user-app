import { UserProvider } from './../../providers/user/user';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [UserProvider]
})

export class RegisterPage {

  user: User = new User();
  form: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private toast: ToastController,
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
      placa: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(8), Validators.pattern(/[A-Z]{3}-?\d{4}/)]],
    })
  }

  comparePasswords() {
    if (!this.form)
      return false;
    return this.form.controls['password'].value == this.form.controls['passwordConfirmation'].value
  }

  registerClick() {
    this.userProvider.register(this.user).subscribe(res => {
      let loading = this.loadingCtrl.create({
        spinner: 'dots',
        content: 'Aguarde...'
      });

      loading.present();

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
      loading.dismiss();
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
