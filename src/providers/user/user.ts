import { User } from './../../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserProvider {

  constructor(public http: HttpClient) { }

  register(user: User) {
    return this.http.post<any>('http://localhost:8080/users/register', user);
  }
}
