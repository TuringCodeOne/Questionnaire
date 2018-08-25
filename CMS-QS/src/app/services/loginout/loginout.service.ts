import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as Api from '../../shares/Api';

@Injectable()
export class LoginoutService {

  constructor(private http: Http) { }

  async login(username: string, password: string): Promise<boolean> {
    const resp = await this.http.post(Api.LOGIN_URL, { name: username, password: password }).toPromise();
    const json = await resp.json();
    if (json.success) {
      // login success
      this.clear();
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('password', password);
    }
    return json.success;
  }

  clear() {
    if (sessionStorage.getItem('username') || sessionStorage.getItem('password')) {
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('token');
    }
  }
}
