import { User } from './../../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseProvider } from '../baseprovider';

@Injectable()
export class UserProvider extends BaseProvider {

  constructor(public http: HttpClient) {
    super(http, null);
  }

  register(user: User) {
    return this.http.post<any>(this.url +'users/register', user);
  }

  update(user: User) {
    return this.http.put<any>(this.url + 'users/update', user);
  }

  get(id) {
    return this.http.get<any>(this.url +'users/' + id);
  }
}
