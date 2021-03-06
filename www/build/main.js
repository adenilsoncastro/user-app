webpackJsonp([0],{

/***/ 130:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Car; });
var Car = /** @class */ (function () {
    function Car() {
    }
    return Car;
}());

//# sourceMappingURL=car.js.map

/***/ }),

/***/ 134:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseprovider__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginProvider = /** @class */ (function (_super) {
    __extends(LoginProvider, _super);
    function LoginProvider(http) {
        var _this = _super.call(this, http, null) || this;
        _this.http = http;
        return _this;
    }
    LoginProvider.prototype.login = function (login) {
        return this.http.post(this.url + 'users/login', { username: login.username, password: login.password, usertype: 1 });
    };
    LoginProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */]])
    ], LoginProvider);
    return LoginProvider;
}(__WEBPACK_IMPORTED_MODULE_0__baseprovider__["a" /* BaseProvider */]));

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 135:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__register_register__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_login_login__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_login__ = __webpack_require__(419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__auth0_angular_jwt__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, _loginProvider, _toast, _storage, _jwtHelper, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._loginProvider = _loginProvider;
        this._toast = _toast;
        this._storage = _storage;
        this._jwtHelper = _jwtHelper;
        this.loadingCtrl = loadingCtrl;
        this.loginModel = new __WEBPACK_IMPORTED_MODULE_3__models_login__["a" /* LoginModel */]();
    }
    LoginPage.prototype.onClick = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    LoginPage.prototype.loginClick = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: 'dots',
            content: 'Aguarde...'
        });
        loading.present();
        this._loginProvider.login(this.loginModel).subscribe(function (res) {
            if (res.success == false) {
                res.error.forEach(function (element) {
                    _this._toast.create({
                        message: element.msg,
                        duration: 3000,
                        position: 'bottom'
                    }).present();
                });
                loading.dismiss();
                return;
            }
            var decodedToken = _this._jwtHelper.decodeToken(res.token);
            var expirationDate = _this._jwtHelper.getTokenExpirationDate(res.token);
            var isExpired = _this._jwtHelper.isTokenExpired(res.token);
            _this.loginModel = new __WEBPACK_IMPORTED_MODULE_3__models_login__["a" /* LoginModel */]();
            _this.loginModel.username = "";
            _this.loginModel.password = "";
            _this.loginModel.usertype = 1;
            _this._storage.set('token', res.token).then(function () {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
            });
            loading.dismiss();
        }, function (error) {
            console.log(error);
            var errorMsg = "";
            if (error.error.text) {
                errorMsg = error.error.text;
            }
            else {
                errorMsg = error.message;
            }
            var toast = _this._toast.create({
                message: "Ocorreu um erro ao se comunicar com o servidor",
                duration: 3000,
                position: 'bottom'
            }).present();
            loading.dismiss();
        });
    };
    LoginPage.prototype.registerClick = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__register_register__["a" /* RegisterPage */]);
    };
    LoginPage.prototype.isFormValid = function () {
        if (!this.loginModel)
            return false;
        if (!this.loginModel.username || !this.loginModel.password)
            return false;
        return this.loginModel.username.length > 0 && this.loginModel.password.length > 0;
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\Users\oluis\Desktop\TCC\user-app\src\pages\login\login.html"*/'<ion-content scroll="false">\n\n  <div class="box-login">\n\n    <div class="login-form-container">\n\n      <ion-row class="logo-row">\n\n        <div class="img-container">\n\n          <ion-img class="img-ion" src="assets/imgs/logo2.png"></ion-img>\n\n        </div>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-list class="list-login-form">\n\n          <ion-item class="login-input">\n\n            <ion-input class="input-field" placeholder="Login" autofocus [(ngModel)]="loginModel.username" type="text"></ion-input>\n\n          </ion-item>\n\n          <ion-item class="login-input">\n\n            <ion-input class="input-field" placeholder="Senha" [(ngModel)]="loginModel.password" type="password"></ion-input>\n\n          </ion-item>\n\n        </ion-list>\n\n      </ion-row>\n\n      <div>\n\n        <button class="button-login" [disabled]="!isFormValid()" (click)="loginClick()" ion-button>Sign In</button>\n\n        <button class="button-register" ion-button (click)="registerClick()">Não é registrado? Clique aqui!</button>\n\n      </div>\n\n    </div>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\oluis\Desktop\TCC\user-app\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1__providers_login_login__["a" /* LoginProvider */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["j" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_7__auth0_angular_jwt__["a" /* JwtHelperService */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["e" /* LoadingController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_user_user__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_user__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var RegisterPage = /** @class */ (function () {
    function RegisterPage(navCtrl, navParams, fb, toast, userProvider, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.toast = toast;
        this.userProvider = userProvider;
        this.loadingCtrl = loadingCtrl;
        this.user = new __WEBPACK_IMPORTED_MODULE_1__models_user__["a" /* User */]();
        this.form = this.fb.group({
            name: ['', [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].minLength(1), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].maxLength(150)]],
            email: ['', [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].email]],
            username: ['', [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].minLength(1), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].maxLength(150)]],
            password: ['', [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].minLength(1), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].maxLength(150)]],
            passwordConfirmation: ['', [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].minLength(1), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].maxLength(150)]],
            marca: ['', [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].minLength(1), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].maxLength(150)]],
            modelo: ['', [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].minLength(1), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].maxLength(150)]],
            placa: ['', [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].minLength(1), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].maxLength(8), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].pattern(/[A-Z]{3}-\d{4}/)]],
        });
    }
    RegisterPage.prototype.comparePasswords = function () {
        if (!this.form)
            return false;
        return this.form.controls['password'].value == this.form.controls['passwordConfirmation'].value;
    };
    RegisterPage.prototype.registerClick = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: 'dots',
            content: 'Aguarde...'
        });
        loading.present();
        this.userProvider.register(this.user).subscribe(function (res) {
            loading.dismiss();
            if (res.success == false) {
                res.error.forEach(function (element) {
                    _this.toast.create({
                        message: element.msg,
                        duration: 3000,
                        position: 'bottom'
                    }).present();
                });
            }
            else {
                _this.toast.create({
                    message: 'Usuário criado com sucesso',
                    duration: 3000,
                    position: 'bottom'
                }).present()
                    .then(function () {
                    _this.goBackClick();
                });
            }
            console.log(res);
        }, function (error) {
            loading.dismiss();
            _this.toast.create({
                message: "Ocorreu um erro ao se comunicar com o servidor",
                duration: 3000,
                position: 'bottom'
            }).present();
        });
    };
    RegisterPage.prototype.goBackClick = function () {
        this.navCtrl.pop();
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"C:\Users\oluis\Desktop\TCC\user-app\src\pages\register\register.html"*/'<ion-content>\n\n  <div class="register-container">\n\n    <ion-row class="row-img">\n\n      <div class="image-container">\n\n        <ion-img class="img-ion" src="assets/imgs/logo2.png"></ion-img>\n\n      </div>\n\n    </ion-row>\n\n    <ion-row>\n\n      <form [formGroup]="form" class="register-form">\n\n        <ion-list class="form-list-container">\n\n          <div class="user-info">\n\n            <ion-item class="register-input">\n\n              <ion-input class="input-field" placeholder="Nome" [(ngModel)]="user.name" formControlName="name" type="text"></ion-input>\n\n            </ion-item>\n\n            <ion-label *ngIf="form.controls[\'name\'].errors && form.controls[\'name\'].dirty" color="danger">O nome é obrigatório</ion-label>\n\n\n\n            <ion-item class="register-input">\n\n              <ion-input class="input-field" placeholder="E-mail" [(ngModel)]="user.email" formControlName="email" type="email"></ion-input>\n\n            </ion-item>\n\n            <ion-label *ngIf="form.controls[\'email\'].errors && form.controls[\'email\'].dirty" color="danger">O E-mail está incorreto</ion-label>\n\n\n\n            <ion-item class="register-input">\n\n              <ion-input class="input-field" placeholder="Login" [(ngModel)]="user.username" s formControlName="username" type="text"></ion-input>\n\n            </ion-item>\n\n            <ion-label *ngIf="form.controls[\'username\'].errors && form.controls[\'username\'].dirty" color="danger">Login inválido</ion-label>\n\n\n\n            <ion-item class="register-input">\n\n              <ion-input class="input-field" placeholder="Senha" [(ngModel)]="user.password" formControlName="password" type="password"></ion-input>\n\n            </ion-item>\n\n            <ion-label *ngIf="form.controls[\'password\'].errors && form.controls[\'password\'].dirty" color="danger">Senha incorreta </ion-label>\n\n\n\n            <ion-item class="register-input">\n\n              <ion-input class="input-field" [(ngModel)]="user.passwordConfirmation" placeholder="Confirme a senha"formControlName="passwordConfirmation" type="password"></ion-input>\n\n            </ion-item>\n\n            <ion-label *ngIf="form.controls[\'passwordConfirmation\'].errors && form.controls[\'passwordConfirmation\'].dirty" color="danger">Senhas não conferem</ion-label>\n\n          </div>\n\n\n\n          <div class="car-info">\n\n            <ion-item class="register-input">\n\n              <ion-input class="input-field" placeholder="Marca do veículo"[(ngModel)]="user.car.marca" formControlName="marca" type="text"></ion-input>\n\n            </ion-item>\n\n            <ion-label *ngIf="form.controls[\'marca\'].errors && form.controls[\'marca\'].dirty" color="danger">A marca está incorreta</ion-label>\n\n            <ion-item class="register-input">\n\n              <ion-input class="input-field" placeholder="Modelo do veículo" [(ngModel)]="user.car.modelo" formControlName="modelo" type="text"></ion-input>\n\n            </ion-item>\n\n            <ion-label *ngIf="form.controls[\'modelo\'].errors && form.controls[\'modelo\'].dirty" color="danger">O modelo está incorreto</ion-label>\n\n            <ion-item class="register-input">\n\n              <ion-input oninput="this.value = this.value != null ? this.value.toUpperCase() : this.value" class="input-field" placeholder="Placa do veículo"[(ngModel)]="user.car.placa" formControlName="placa" type="text"></ion-input>\n\n            </ion-item>\n\n            <ion-label *ngIf="form.controls[\'placa\'].errors && form.controls[\'placa\'].dirty" color="danger">A placa está incorreta! Tente no formato ABC-1234</ion-label>\n\n          </div>\n\n        </ion-list>\n\n\n\n        <div padding>\n\n          <button class="button-register" [disabled]="!form.valid || !comparePasswords()" (click)="registerClick()" ion-button>Registrar</button>\n\n          <button class="button-go-back"(click)="goBackClick()" ion-button>Voltar</button>\n\n        </div>\n\n      </form>\n\n    </ion-row>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\oluis\Desktop\TCC\user-app\src\pages\register\register.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_0__providers_user_user__["a" /* UserProvider */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_0__providers_user_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* LoadingController */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_transit_transit__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_user__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth0_angular_jwt__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__qrcode_qrcode__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__alter_alter__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_user_user__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__models_car__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_fcm_provider__ = __webpack_require__(139);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, _storage, _jwtHelper, _transitProvider, _toast, userProvider, fcm) {
        this.navCtrl = navCtrl;
        this._storage = _storage;
        this._jwtHelper = _jwtHelper;
        this._transitProvider = _transitProvider;
        this._toast = _toast;
        this.userProvider = userProvider;
        this.fcm = fcm;
        this.user = new __WEBPACK_IMPORTED_MODULE_1__models_user__["a" /* User */]();
        this.transits = [];
        this.countOfToday = 0;
        this.init();
    }
    HomePage.prototype.init = function () {
        this.getInfo();
        this.getToken();
    };
    HomePage.prototype.getToken = function () {
        var _this = this;
        this.fcm.getToken().then(function (result) {
            var toast = _this._toast.create({
                message: result,
                duration: 3000,
                position: 'bottom'
            });
            toast.present();
        });
    };
    HomePage.prototype.getInfo = function () {
        var _this = this;
        this._storage.get('token').then(function (val) {
            var decodedToken = _this._jwtHelper.decodeToken(val);
            if (decodedToken.user) {
                _this.userProvider.get(decodedToken.user._id).subscribe(function (res) {
                    _this.user = res.user;
                    _this.user.car = new __WEBPACK_IMPORTED_MODULE_9__models_car__["a" /* Car */]();
                    _this.user.car.marca = res.user.marca;
                    _this.user.car.modelo = res.user.modelo;
                    _this.user.car.placa = res.user.placa;
                    _this.user.name = _this.user.name.split(' ')[0];
                }, function (error) {
                    var errorMsg = "";
                    if (error.error.text) {
                        errorMsg = error.error.text;
                    }
                    else {
                        errorMsg = error.message;
                    }
                    var toast = _this._toast.create({
                        message: "Ocorreu um erro na comunicação com o servidor",
                        duration: 3000,
                        position: 'bottom'
                    });
                    toast.present();
                });
                _this._transitProvider.list(_this.user._id).subscribe(function (res) {
                    _this.transits = res.data;
                    _this.transits.forEach(function (item) {
                        if (item.img != null)
                            item.img = 'data:image/jpeg;base64,' + item.img;
                    });
                }, function (error) {
                    console.log(error);
                    var toast = _this._toast.create({
                        message: error.error.text,
                        duration: 3000,
                        position: 'bottom'
                    });
                    toast.present();
                });
                _this._transitProvider.countOfToday(_this.user._id).subscribe(function (res) {
                    _this.countOfToday = res.data;
                    if (res.data == null)
                        _this.countOfToday = 0;
                }, function (error) {
                    console.log(error);
                    var toast = _this._toast.create({
                        message: error.error.text,
                        duration: 3000,
                        position: 'bottom'
                    });
                    toast.present();
                });
            }
        });
    };
    HomePage.prototype.ionViewDidEnter = function () {
        this.getInfo();
    };
    HomePage.prototype.logout = function () {
        this._storage.clear();
        this.navCtrl.pop();
    };
    HomePage.prototype.QrCode = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__qrcode_qrcode__["a" /* QrcodePage */]);
    };
    HomePage.prototype.alter = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__alter_alter__["a" /* AlterPage */]);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\oluis\Desktop\TCC\user-app\src\pages\home\home.html"*/'<ion-content>\n\n  <div class="home-container">\n\n    <div>\n\n      <button class="button-logout" (click)="getToken()" ion-button></button>\n\n      <div class="home-user-info">\n\n        <div class="user-name-container">\n\n          <span class="home-user-welcome">Olá, {{user?.name}}\n\n          </span>\n\n        </div>\n\n        <div class="vehicle-info">\n\n          <span class="home-user-car-model">Veículo: {{user?.car?.modelo}}</span>\n\n          <span class="home-user-car-plate">Placa: {{user?.car?.placa}} </span>\n\n          <span class="home-user-car-usage">Você utilizou a cancela {{countOfToday}} vezes hoje.</span>\n\n        </div>\n\n      </div>\n\n      <div class="transit-info" style="overflow-y: auto; max-height: -webkit-fill-available">\n\n        <div class="transit-container" style="height: 0px; padding-bottom: 95%" *ngIf="transits">\n\n          <div class="row transit-line" *ngFor="let transit of transits">\n\n            <div class="col text-historic">{{transit.automaticBarrierLocatioName}}</div>\n\n            <div class="col text-historic">{{transit.date | date: \'medium\' }}</div>\n\n            <div class="col text-historic">\n\n              <img src={{transit.img}} />\n\n            </div>\n\n          </div>\n\n        </div>\n\n      </div>\n\n    </div>\n\n    <div class="row action-button-container">\n\n      <div class="col col-user-action">\n\n        <button class="button-qrcode" (click)="QrCode()" ion-button>\n\n          <ion-img class="img-action-button" src="assets/imgs/qr-code.png"></ion-img>\n\n        </button>\n\n      </div>\n\n      <div class="col col-user-action">\n\n        <button class="button-profile" (click)="alter()" ion-button>\n\n          <ion-img class="img-action-button" src="assets/imgs/user.png"></ion-img>\n\n        </button>\n\n      </div>\n\n      <div class="col col-user-action">\n\n        <button class="button-logout" (click)="logout()" ion-button>\n\n          <ion-img class="img-action-button" src="assets/imgs/logout.png"></ion-img>\n\n        </button>\n\n      </div>\n\n    </div>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\oluis\Desktop\TCC\user-app\src\pages\home\home.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_0__providers_transit_transit__["a" /* TransitProvider */], __WEBPACK_IMPORTED_MODULE_8__providers_user_user__["a" /* UserProvider */]],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__auth0_angular_jwt__["a" /* JwtHelperService */],
            __WEBPACK_IMPORTED_MODULE_0__providers_transit_transit__["a" /* TransitProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_8__providers_user_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_10__providers_fcm_provider__["a" /* FcmProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QrcodePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth0_angular_jwt__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_user__ = __webpack_require__(80);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var QrcodePage = /** @class */ (function () {
    function QrcodePage(navCtrl, navParams, _toast, _jwtHelper, _storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._toast = _toast;
        this._jwtHelper = _jwtHelper;
        this._storage = _storage;
        this.user = new __WEBPACK_IMPORTED_MODULE_4__models_user__["a" /* User */]();
        this._toast.create({
            message: 'Posicione o aparelho na vertical, apresente o QR code gerado para a câmera e aguarde a autenticação',
            duration: 4000,
            position: 'middle'
        }).present();
        this.init();
    }
    QrcodePage.prototype.init = function () {
        var _this = this;
        this._storage.get('token').then(function (val) {
            var decodedToken = _this._jwtHelper.decodeToken(val);
            if (decodedToken.user)
                _this.user = decodedToken.user;
        });
    };
    QrcodePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad QrcodePage');
    };
    QrcodePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-qrcode',template:/*ion-inline-start:"C:\Users\oluis\Desktop\TCC\user-app\src\pages\qrcode\qrcode.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>QR code</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n    <div class="qr-code-container">\n\n      <div class="qr-code">\n\n        <qr-code value={{user?._id}} size="300"></qr-code>\n\n      </div>\n\n    </div>    \n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\oluis\Desktop\TCC\user-app\src\pages\qrcode\qrcode.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2__auth0_angular_jwt__["a" /* JwtHelperService */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], QrcodePage);
    return QrcodePage;
}());

//# sourceMappingURL=qrcode.js.map

/***/ }),

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FcmProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_firebase__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__baseprovider__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__auth0_angular_jwt__ = __webpack_require__(48);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







var FcmProvider = /** @class */ (function (_super) {
    __extends(FcmProvider, _super);
    function FcmProvider(platform, firebaseNative, _storage, _jwtHelper, http) {
        var _this = _super.call(this, http, _storage) || this;
        _this.platform = platform;
        _this.firebaseNative = firebaseNative;
        _this._storage = _storage;
        _this._jwtHelper = _jwtHelper;
        _this.http = http;
        return _this;
    }
    FcmProvider.prototype.getToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.firebaseNative.getToken()];
                    case 1:
                        token = _a.sent();
                        this._storage.get('token').then(function (val) {
                            var decodedToken = _this._jwtHelper.decodeToken(val);
                            _this.firebaseNative.onTokenRefresh()
                                .subscribe(function (token) { return console.log("Got a new token " + token); });
                            _this.http.post(_this.url + 'notification/store', { 'token': token, 'userId': decodedToken.user._id })
                                .subscribe(function (data) {
                                console.log(JSON.stringify(data));
                            }, function (error) {
                                console.log("err");
                                console.log(JSON.stringify(error));
                            });
                        });
                        return [2 /*return*/, token];
                }
            });
        });
    };
    FcmProvider.prototype.listenToNotifications = function () {
        return this.firebaseNative.onNotificationOpen();
    };
    FcmProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_firebase__["a" /* Firebase */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_6__auth0_angular_jwt__["a" /* JwtHelperService */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClient */]])
    ], FcmProvider);
    return FcmProvider;
}(__WEBPACK_IMPORTED_MODULE_4__baseprovider__["a" /* BaseProvider */]));

//# sourceMappingURL=fcm-provider.js.map

/***/ }),

/***/ 186:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 186;

/***/ }),

/***/ 190:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QrcodePageModule", function() { return QrcodePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__qrcode__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_qrcode__ = __webpack_require__(282);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var QrcodePageModule = /** @class */ (function () {
    function QrcodePageModule() {
    }
    QrcodePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__qrcode__["a" /* QrcodePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__qrcode__["a" /* QrcodePage */]),
                __WEBPACK_IMPORTED_MODULE_3_angular2_qrcode__["a" /* QRCodeModule */]
            ],
        })
    ], QrcodePageModule);
    return QrcodePageModule;
}());

//# sourceMappingURL=qrcode.module.js.map

/***/ }),

/***/ 234:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/alter/alter.module": [
		235
	],
	"../pages/login/login.module": [
		240
	],
	"../pages/qrcode/qrcode.module": [
		190
	],
	"../pages/register/register.module": [
		242
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 234;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlterPageModule", function() { return AlterPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_user_user__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__alter__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var AlterPageModule = /** @class */ (function () {
    function AlterPageModule() {
    }
    AlterPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__alter__["a" /* AlterPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_5__alter__["a" /* AlterPage */]),
                __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["a" /* IonicStorageModule */],
                __WEBPACK_IMPORTED_MODULE_0__angular_common__["b" /* CommonModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_1__providers_user_user__["a" /* UserProvider */]
            ]
        })
    ], AlterPageModule);
    return AlterPageModule;
}());

//# sourceMappingURL=alter.module.js.map

/***/ }),

/***/ 238:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_user_user__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_user__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__auth0_angular_jwt__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_car__ = __webpack_require__(130);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var AlterPage = /** @class */ (function () {
    function AlterPage(navCtrl, _storage, _jwtHelper, toast, fb, userProvider, loadingCtrl) {
        this.navCtrl = navCtrl;
        this._storage = _storage;
        this._jwtHelper = _jwtHelper;
        this.toast = toast;
        this.fb = fb;
        this.userProvider = userProvider;
        this.loadingCtrl = loadingCtrl;
        this.user = new __WEBPACK_IMPORTED_MODULE_1__models_user__["a" /* User */]();
        this.form = this.fb.group({
            name: ['', [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].minLength(1), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].maxLength(150)]],
            email: ['', [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].email]],
            username: ['', [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].minLength(1), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].maxLength(150)]],
            password: ['', [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].minLength(1), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].maxLength(150)]],
            passwordConfirmation: ['', [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].minLength(1), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].maxLength(150)]],
            marca: ['', [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].minLength(1), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].maxLength(150)]],
            modelo: ['', [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].minLength(1), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].maxLength(150)]],
            placa: ['', [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].minLength(1), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].maxLength(8), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].pattern(/[A-Z]{3}-\d{4}/)]],
        });
        this.init();
    }
    AlterPage.prototype.init = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: 'dots',
            content: 'Aguarde...'
        });
        loading.present();
        this._storage.get('token').then(function (val) {
            var decodedToken = _this._jwtHelper.decodeToken(val);
            if (decodedToken.user) {
                _this.userProvider.get(decodedToken.user._id).subscribe(function (res) {
                    loading.dismiss();
                    _this.user = res.user;
                    _this.user.car = new __WEBPACK_IMPORTED_MODULE_7__models_car__["a" /* Car */]();
                    _this.user.car.marca = res.user.marca;
                    _this.user.car.modelo = res.user.modelo;
                    _this.user.car.placa = res.user.placa;
                }, function (error) {
                    loading.dismiss();
                    var errorMsg = "";
                    if (error.error.text) {
                        errorMsg = error.error.text;
                    }
                    else {
                        errorMsg = error.message;
                    }
                    var toast = _this.toast.create({
                        message: "Ocorreu um erro na comunicação com o servidor",
                        duration: 3000,
                        position: 'bottom'
                    });
                    toast.present();
                });
            }
        });
    };
    AlterPage.prototype.comparePasswords = function () {
        if (!this.form)
            return false;
        return this.form.controls['password'].value == this.form.controls['passwordConfirmation'].value;
    };
    AlterPage.prototype.alterClick = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: 'dots',
            content: 'Aguarde...'
        });
        loading.present();
        this.user.usertype = 1;
        this.userProvider.update(this.user).subscribe(function (res) {
            if (res.success == false) {
                loading.dismiss();
                res.error.forEach(function (element) {
                    _this.toast.create({
                        message: element.msg,
                        duration: 3000,
                        position: 'bottom'
                    }).present();
                });
            }
            else {
                loading.dismiss();
                _this.toast.create({
                    message: 'Usuário alterado com sucesso',
                    duration: 3000,
                    position: 'bottom'
                }).present()
                    .then(function () {
                    _this.goBackClick();
                });
            }
            console.log(res);
        }, function (error) {
            loading.dismiss();
            _this.toast.create({
                message: "Ocorreu um erro na comunicação com o servidor",
                duration: 3000,
                position: 'bottom'
            }).present();
        });
    };
    AlterPage.prototype.goBackClick = function () {
        this.navCtrl.pop();
    };
    AlterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-alter',template:/*ion-inline-start:"C:\Users\oluis\Desktop\TCC\user-app\src\pages\alter\alter.html"*/'<ion-content>\n\n  <div class="update-container">\n\n    <div class="title-update">\n\n      <div class="title-container">\n\n        <span class="title">Atualizar dados</span>\n\n      </div>\n\n    </div>\n\n    <div class="update-form-container">\n\n      <form [formGroup]="form">\n\n        <ion-list>\n\n          <div class="user-info">\n\n            <ion-item class="register-input">\n\n              <ion-input class="input-field" [(ngModel)]="user.name" formControlName="name" type="text"></ion-input>\n\n            </ion-item>\n\n            <ion-label *ngIf="form.controls[\'name\'].errors && form.controls[\'name\'].dirty" color="danger">O Nome é obrigatório</ion-label>\n\n\n\n            <ion-item class="register-input">\n\n              <ion-input class="input-field" [(ngModel)]="user.email" formControlName="email" type="email"></ion-input>\n\n            </ion-item>\n\n            <ion-label *ngIf="form.controls[\'email\'].errors && form.controls[\'email\'].dirty" color="danger">O E-mail está incorreto</ion-label>\n\n\n\n            <ion-item class="register-input">\n\n              <ion-input class="input-field" [(ngModel)]="user.username" formControlName="username" type="text" disabled></ion-input>\n\n            </ion-item>\n\n            <ion-label *ngIf="form.controls[\'username\'].errors && form.controls[\'username\'].dirty" color="danger">Login inválido</ion-label>\n\n\n\n            <ion-item class="register-input">\n\n              <ion-input class="input-field" [(ngModel)]="user.password" formControlName="password" type="password"></ion-input>\n\n            </ion-item>\n\n            <ion-label *ngIf="form.controls[\'password\'].errors && form.controls[\'password\'].dirty" color="danger">Senha incorreta</ion-label>\n\n\n\n            <ion-item class="register-input">\n\n              <ion-input class="input-field" placeholder="Confirme a senha" [(ngModel)]="user.passwordConfirmation" formControlName="passwordConfirmation"\n\n                type="password"></ion-input>\n\n            </ion-item>\n\n            <ion-label *ngIf="form.controls[\'passwordConfirmation\'].errors && form.controls[\'passwordConfirmation\'].dirty" color="danger">Senhas não conferem</ion-label>\n\n          </div>\n\n\n\n          <div class="car-info">\n\n            <ion-item class="register-input">\n\n              <ion-input class="input-field" [(ngModel)]="user.car.marca" formControlName="marca" type="text"></ion-input>\n\n            </ion-item>\n\n            <ion-label *ngIf="form.controls[\'marca\'].errors && form.controls[\'marca\'].dirty" color="danger">A marca está incorreta</ion-label>\n\n\n\n            <ion-item class="register-input">\n\n              <ion-input class="input-field" [(ngModel)]="user.car.modelo" formControlName="modelo" type="text"></ion-input>\n\n            </ion-item>\n\n            <ion-label *ngIf="form.controls[\'modelo\'].errors && form.controls[\'modelo\'].dirty" color="danger">O modelo está incorreto</ion-label>\n\n\n\n            <ion-item class="register-input">\n\n              <ion-input class="input-field" oninput="this.value = this.value != null ? this.value.toUpperCase() : this.value" [(ngModel)]="user.car.placa"\n\n                formControlName="placa" type="text"></ion-input>\n\n            </ion-item>\n\n            <ion-label *ngIf="form.controls[\'placa\'].errors && form.controls[\'placa\'].dirty" color="danger">A placa está incorreta! Tente no formato ABC-1234</ion-label>\n\n          </div>\n\n        </ion-list>\n\n\n\n        <div>\n\n          <button class="button-update" [disabled]="!form.valid || !comparePasswords()" (click)="alterClick()" ion-button>Alterar</button>\n\n          <button class="button-go-back" (click)="goBackClick()" ion-button>Voltar</button>\n\n        </div>\n\n      </form>\n\n    </div>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\oluis\Desktop\TCC\user-app\src\pages\alter\alter.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_0__providers_user_user__["a" /* UserProvider */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_5__auth0_angular_jwt__["a" /* JwtHelperService */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_0__providers_user_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* LoadingController */]])
    ], AlterPage);
    return AlterPage;
}());

//# sourceMappingURL=alter.js.map

/***/ }),

/***/ 240:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_login_login__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var LoginPageModule = /** @class */ (function () {
    function LoginPageModule() {
    }
    LoginPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__login__["a" /* LoginPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__login__["a" /* LoginPage */]),
                __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["c" /* HttpClientModule */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_0__providers_login_login__["a" /* LoginProvider */],
            ]
        })
    ], LoginPageModule);
    return LoginPageModule;
}());

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 241:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransitProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseprovider__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_mergeMap__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_mergeMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_mergeMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_fromPromise__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_fromPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_fromPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var TransitProvider = /** @class */ (function (_super) {
    __extends(TransitProvider, _super);
    function TransitProvider(http, _storage) {
        var _this = _super.call(this, http, _storage) || this;
        _this.http = http;
        _this._storage = _storage;
        return _this;
    }
    TransitProvider.prototype.getAuthHeaders = function () {
        return __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__["Observable"].fromPromise(this._storage.get('token'));
    };
    TransitProvider.prototype.list = function (userId) {
        var _this = this;
        return this.getAuthHeaders().flatMap(function (api_token) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpHeaders */]({
                'Content-Type': 'application/json; charset=utf-8',
                token: api_token,
            });
            var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["e" /* HttpParams */]()
                .set('userId', userId);
            return _this.http.get(_this.url + 'transits/list', { headers: headers, params: params });
        });
    };
    TransitProvider.prototype.countOfToday = function (userId) {
        var _this = this;
        return this.getAuthHeaders().flatMap(function (api_token) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpHeaders */]({
                'Content-Type': 'application/json; charset=utf-8',
                token: api_token,
            });
            var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["e" /* HttpParams */]()
                .set('userId', userId);
            return _this.http.get(_this.url + 'transits/countOfToday', { headers: headers, params: params });
        });
    };
    TransitProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], TransitProvider);
    return TransitProvider;
}(__WEBPACK_IMPORTED_MODULE_0__baseprovider__["a" /* BaseProvider */]));

//# sourceMappingURL=transit.js.map

/***/ }),

/***/ 242:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterPageModule", function() { return RegisterPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_user_user__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__register__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var RegisterPageModule = /** @class */ (function () {
    function RegisterPageModule() {
    }
    RegisterPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__register__["a" /* RegisterPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__register__["a" /* RegisterPage */]),
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* ReactiveFormsModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_0__providers_user_user__["a" /* UserProvider */]
            ]
        })
    ], RegisterPageModule);
    return RegisterPageModule;
}());

//# sourceMappingURL=register.module.js.map

/***/ }),

/***/ 377:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(382);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 382:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export tokenGetter */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_firebase__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_qrcode_qrcode_module__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_register_register_module__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_alter_alter_module__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__(438);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_home_home__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_qrcode_qrcode__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_status_bar__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_splash_screen__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_login_login__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_storage__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_register_register__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__auth0_angular_jwt__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_angular2_qrcode__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_transit_transit__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__angular_common__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_login_login_module__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__angular_fire_firestore__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__angular_fire__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__providers_fcm_provider__ = __webpack_require__(139);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

























function tokenGetter() {
    return localStorage.getItem('token');
}
var config = {
    apiKey: "AIzaSyAq2fNja3CX-ywc-twJHRtmwvBAaOsU1wc",
    authDomain: "user-app-5c3ae.firebaseapp.com",
    databaseURL: "https://user-app-5c3ae.firebaseio.com",
    projectId: "user-app-5c3ae",
    storageBucket: "user-app-5c3ae.appspot.com",
    messagingSenderId: "996441861974"
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_7__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_10__pages_home_home__["a" /* HomePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/alter/alter.module#AlterPageModule', name: 'AlterPage', segment: 'alter', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/qrcode/qrcode.module#QrcodePageModule', name: 'QrcodePage', segment: 'qrcode', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_15__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_17__auth0_angular_jwt__["b" /* JwtModule */].forRoot({
                    config: {
                        tokenGetter: tokenGetter,
                        whitelistedDomains: ['localhost:3001'],
                        blacklistedRoutes: ['localhost:3001/auth/']
                    }
                }),
                __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["c" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_1__pages_qrcode_qrcode_module__["QrcodePageModule"],
                __WEBPACK_IMPORTED_MODULE_15__ionic_storage__["a" /* IonicStorageModule */],
                __WEBPACK_IMPORTED_MODULE_21__pages_login_login_module__["LoginPageModule"],
                __WEBPACK_IMPORTED_MODULE_2__pages_register_register_module__["RegisterPageModule"],
                __WEBPACK_IMPORTED_MODULE_18_angular2_qrcode__["a" /* QRCodeModule */],
                __WEBPACK_IMPORTED_MODULE_3__pages_alter_alter_module__["AlterPageModule"],
                __WEBPACK_IMPORTED_MODULE_20__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_23__angular_fire__["a" /* AngularFireModule */].initializeApp(config),
                __WEBPACK_IMPORTED_MODULE_22__angular_fire_firestore__["b" /* AngularFirestoreModule */],
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_8_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_10__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_qrcode_qrcode__["a" /* QrcodePage */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_7__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_14__providers_login_login__["a" /* LoginProvider */],
                __WEBPACK_IMPORTED_MODULE_19__providers_transit_transit__["a" /* TransitProvider */],
                __WEBPACK_IMPORTED_MODULE_22__angular_fire_firestore__["a" /* AngularFirestore */],
                __WEBPACK_IMPORTED_MODULE_0__ionic_native_firebase__["a" /* Firebase */],
                __WEBPACK_IMPORTED_MODULE_24__providers_fcm_provider__["a" /* FcmProvider */],
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 419:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginModel; });
var LoginModel = /** @class */ (function () {
    function LoginModel() {
        this.usertype = 1;
    }
    return LoginModel;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 438:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_fcm_provider__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_operators__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_firebase__ = __webpack_require__(100);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, fcm, toastCtrl, firebaseNative) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.firebaseNative = firebaseNative;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */];
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            // fcm.getToken();
            fcm.listenToNotifications().pipe(Object(__WEBPACK_IMPORTED_MODULE_7_rxjs_operators__["tap"])(function (msg) {
                var toast = toastCtrl.create({
                    message: msg.body,
                    duration: 3000
                });
                toast.present();
            }))
                .subscribe();
        });
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] }
        ];
    }
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\oluis\Desktop\TCC\user-app\src\app\app.html"*/'<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"C:\Users\oluis\Desktop\TCC\user-app\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_6__providers_fcm_provider__["a" /* FcmProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_firebase__["a" /* Firebase */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__baseprovider__ = __webpack_require__(79);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserProvider = /** @class */ (function (_super) {
    __extends(UserProvider, _super);
    function UserProvider(http) {
        var _this = _super.call(this, http, null) || this;
        _this.http = http;
        return _this;
    }
    UserProvider.prototype.register = function (user) {
        return this.http.post(this.url + 'users/register', user);
    };
    UserProvider.prototype.update = function (user) {
        return this.http.put(this.url + 'users/update', user);
    };
    UserProvider.prototype.get = function (id) {
        return this.http.get(this.url + 'users/' + id);
    };
    UserProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["b" /* HttpClient */]])
    ], UserProvider);
    return UserProvider;
}(__WEBPACK_IMPORTED_MODULE_2__baseprovider__["a" /* BaseProvider */]));

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 79:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var BaseProvider = /** @class */ (function () {
    function BaseProvider(http, _storage) {
        this.http = http;
        this._storage = _storage;
        this.url = "http://ec2-54-218-220-67.us-west-2.compute.amazonaws.com:8080/";
        // url: String = "http://localhost:8080/";
        this.baseUrl = (location.hostname === "localhost") ? 'http://localhost:8080/' : 'http://app.com/api/';
    }
    BaseProvider.prototype.getToken = function () {
        return this._storage.get('token');
    };
    BaseProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["b" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], BaseProvider);
    return BaseProvider;
}());

//# sourceMappingURL=baseprovider.js.map

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__car__ = __webpack_require__(130);

var User = /** @class */ (function () {
    function User() {
        this.car = new __WEBPACK_IMPORTED_MODULE_0__car__["a" /* Car */]();
        this.usertype = 1;
    }
    return User;
}());

//# sourceMappingURL=user.js.map

/***/ })

},[377]);
//# sourceMappingURL=main.js.map