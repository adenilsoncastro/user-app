import { AlterPageModule } from './../pages/alter/alter.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { QrcodePage } from '../pages/qrcode/qrcode'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginProvider } from '../providers/login/login';
import { IonicStorageModule } from '@ionic/storage';
import { RegisterPage } from '../pages/register/register';
import { JwtModule } from '@auth0/angular-jwt';
import { QRCodeModule } from 'angular2-qrcode';
import { TransitProvider } from '../providers/transit/transit';
import { CommonModule } from '@angular/common';
import { AlterPage } from '../pages/alter/alter';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    QrcodePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3001'],
        blacklistedRoutes: ['localhost:3001/auth/']
      }
    }),
    HttpClientModule,
    IonicStorageModule,
    QRCodeModule,
    AlterPageModule,
    CommonModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    QrcodePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LoginProvider,
    TransitProvider,
  ]
})
export class AppModule { }
