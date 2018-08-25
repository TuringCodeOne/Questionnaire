import { Injectable } from '@angular/core';
import { QuestionnairePojo, QuesSubject } from '../../Entities/QuesPojo';
import { Http } from '@angular/http';
import * as Api from '../../shares/Api';
import { ReplyPojo } from '../../Entities/ReplyPojo';
import { AnalyPojo, AnalysPojo } from './../../Entities/AnalyPojo';

@Injectable()
export class QuestionnaireService {

  constructor(private http: Http) {}

  async fetchAllQuesInfo(): Promise<QuestionnairePojo[]> {
    const resp = await this.http.get(Api.QUES_GET_URL).toPromise();
    const json = await resp.json();
    // console.log(json);
    return json as QuestionnairePojo[];
  }

  async fetchQuesAllInfo(id: string): Promise<QuesSubject> {
    const resp = await this.http.get(Api.QUES_GET_URL + `/${id}`).toPromise();
    const json = await resp.json();
    // if (!json.data) {
    //   const msg = json.data + 'questionnaires';
    //   throw new Error(msg);
    // }
    return json as QuesSubject;
  }

  async postAnswer(id: number, info: ReplyPojo): Promise<{success: boolean, msg: string}> {
    const resp = await this.http.post(Api.QUES_GET_URL + `/${id}` + Api.ANS_URL, info).toPromise();
    const json = await resp.json();
    return {success: json.success, msg: json.msg};
  }

  async getAnswers(id: string): Promise<AnalysPojo[]> {
    const resp = await this.http.get(Api.QUES_GET_URL + `/${id}` + Api.ANS_URL).toPromise();
    const json = await resp.json();
    return json.data as AnalysPojo[];
  }

  async createQue(title: string, desc: string, emailTitle: string, email: string, isnt: number): Promise<{success: boolean, id: number}> {
    const resp = await this.http.post(Api.CREATE_QUES_URL, {title: title,
      description: desc,
      email: email,
      isntReply: isnt,
      emailTitle: emailTitle}).toPromise();
    const json = await resp.json();
    return json;
  }
}
