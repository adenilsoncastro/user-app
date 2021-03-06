import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Platform } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseProvider } from './baseprovider';
import { Storage } from "@ionic/storage";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class FcmProvider extends BaseProvider {

    constructor(private platform: Platform,
        public firebaseNative: Firebase,
        public _storage: Storage,
        private _jwtHelper: JwtHelperService,
        public http: HttpClient) {
        super(http, _storage);
    }

    async getToken() {
        let token;
        token = await this.firebaseNative.getToken();

        this._storage.get('token').then((val) => {

            var decodedToken = this._jwtHelper.decodeToken(val);
            
            this.firebaseNative.onTokenRefresh()
                .subscribe((token: string) => console.log(`Got a new token ${token}`));

            this.http.post(this.url + 'notification/store', { 'token': token, 'userId': decodedToken.user._id })
                .subscribe(data => {
                    console.log(JSON.stringify(data));
                }, error => {
                    console.log("err");
                    console.log(JSON.stringify(error));
                });
        });
        return token;
    }

    listenToNotifications() {
        return this.firebaseNative.onNotificationOpen()
    }
}