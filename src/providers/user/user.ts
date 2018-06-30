import { User } from './../../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserProvider {

  constructor(public http: HttpClient) { }

  register(user: User) {
    return this.http.post<any>('http://ec2-54-218-220-67.us-west-2.compute.amazonaws.com:8080/users/register', user);
  }
}
