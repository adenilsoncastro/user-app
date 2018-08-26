import { BaseProvider } from './../baseprovider';
import { LoginModel } from './../../models/login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginProvider extends BaseProvider {

  constructor(public http: HttpClient) {
    super(http, null);
   }

  login(login: LoginModel) {
    return this.http.post<any>(this.url + 'users/login', { username: login.username, password: login.password, usertype: 1 });
  }
}
