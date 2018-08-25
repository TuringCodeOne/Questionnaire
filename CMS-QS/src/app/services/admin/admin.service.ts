import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as Api from '../../shares/Api';

@Injectable()
export class AdminService {

  constructor(private http: Http) { }

  isLogin(): boolean {
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');
    if (username && username !== '' && password && password !== '') {
      return true;
    }
    return false;
  }
  async updateStatus(id: number, status: number): Promise<{success: boolean, msg: string}> {
    const resp = await this.http.post(Api.QUES_GET_URL + `/${id}` + Api.STATUS_URL, {status: status}).toPromise();
    // console.log(status);
    const json = await resp.json();
    return {success: json.success, msg: json.msg};
  }

  async delete(id: number): Promise<{success: boolean, msg: string}> {
    const resp = await this.http.get(Api.QUES_GET_URL + `/${id}` + Api.DEL_URL).toPromise();
    const json = await resp.json();
    return {success: json.success, msg: json.msg};
  }
}
