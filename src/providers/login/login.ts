import { User } from './../../models/user';
import { LoginModel } from './../../models/login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { JwtHelperService } from '@auth0/angular-jwt';
import { BaseProvider } from '../baseprovider';

@Injectable()
export class LoginProvider extends BaseProvider{

  constructor(public http: HttpClient) { 
    super(http, null);
  }

  login(login: LoginModel) {    
    return this.http.post<any>(this.url + 'users/login', { username: login.username, password: login.password, usertype: login.usertype });
  }
}
