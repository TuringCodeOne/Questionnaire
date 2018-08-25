import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as Api from '../../shares/Api';

@Injectable()
export class SubjectService {

  constructor(private http: Http) { }

  async createShortSubject(id: string, type: string, title: string): Promise<{success: boolean}> {
    const resp = await this.http.post(Api.QUES_GET_URL + `/${id}` + Api.CREATE_SHORT_ANS, {title: title, type: type}).toPromise();
    const json = await resp.json();
    // console.log(json);
    return json;
  }
  async createOptSubject(id: string, type: string, title: string, optsContent: string[]): Promise<{success: boolean}> {
    const resp = await this.http.post(Api.QUES_GET_URL + `/${id}` + Api.CREATE_OPT_AND,
    {title: title, type: type, optContent: optsContent}).toPromise();
    const json = await resp.json();
    // console.log(json);
    return json;
  }
}
