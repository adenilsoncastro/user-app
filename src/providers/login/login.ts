import { LoginModel } from './../../models/login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginProvider {

  constructor(public http: HttpClient) { }

  login(login: LoginModel) {
    return this.http.post<any>('http://localhost:3000/users/login', {username: login.username, password: login.password});
  }
}
