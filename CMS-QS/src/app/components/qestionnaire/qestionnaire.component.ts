import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionnaireService } from '../../services/questionnaire/questionnaire.service';
import { QuesSubject } from '../../Entities/QuesPojo';
import { ReplyPojo, ShortAns, Opti } from '../../Entities/ReplyPojo';
import { Option } from '../../Entities/QuesPojo';

@Component({
  selector: 'app-qestionnaire',
  templateUrl: './qestionnaire.component.html',
  styleUrls: ['./qestionnaire.component.css']
})
export class QestionnaireComponent implements OnInit {

  index_qs: boolean;
  isQuit = false;
  info: QuesSubject;
  replyInfo: ReplyPojo = new ReplyPojo;
  shortAns: ShortAns[] = [];
  option: Opti[] = [];
  msg = '';
  // test



  shortAnswer;

  constructor(private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private questionnaire: QuestionnaireService) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.info = await this.questionnaire.fetchQuesAllInfo(id);
    if (this.info.que && this.info.que.status === 1 && this.info.que.delete_token === 0) {
      this.index_qs = true;
    } else {
      this.index_qs = false;
    }
    // console.log(this.info);
  }
  async onSubmit() {
    this.msg = '';
    if (!this.isFulFilling()) {
      this.msg = '提交失败！问卷还没填写完呢！';
    }
    if (this.isFulFilling()) {
      this.getAnContent();
      this.getOptContent();
      // console.log(this.option);
      // console.log(this.shortAns);
      this.replyInfo.id = this.info.que.id;
      this.replyInfo.short_ans = this.shortAns;
      this.replyInfo.option = this.option;
      // console.log(JSON.stringify(this.replyInfo));
      // TODO 网络请求
      const json = await this.questionnaire.postAnswer(this.replyInfo.id, this.replyInfo);
      if (json.success) {
        this.msg = json.msg;
        this.isQuit = true;
      } else {
        this.msg = json.msg;
        // throw new Error(json.msg);
      }
    }
    this.option = [];
    this.shortAns = [];
  }
  onLeave() {
    this.router.navigate(['/'], {replaceUrl: true});
  }
  getCheck(oId: number, sId: number) {
    if (this.info.subs[sId - 1].options.length !== 0) {
      for (let i = 0; i < this.info.subs[sId - 1].options.length; i++) {
        this.info.subs[sId - 1].options[i].select_count = 0;
      }
      this.info.subs[sId - 1].options[oId - 1].select_count = 1;
    }
  }
  getChecks(oId: number, sId: number) {
    if (this.info.subs[sId - 1].options.length !== 0) {
      let i = this.info.subs[sId - 1].options[oId - 1].select_count;
      i++;
      i %= 2;
      this.info.subs[sId - 1].options[oId - 1].select_count = i;
    }
    // console.log(sId);
  }
  isFulFilling(): boolean {
    for (let i = 0; i < this.info.subs.length; i++) {
      if (this.info.subs[i].type === '单选' || this.info.subs[i].type === '多选题') {
        for (let j = 0; j < this.info.subs[i].options.length; j++) {
          if (this.info.subs[i].options[j].select_count === 1) {
            break;
          } else if (j === this.info.subs[i].options.length - 1) {
            return false;
          } else {
            continue;
          }
        }
      } else {
        if (this.info.subs[i].shAns[0].answer === '') {
          return false;
        }
      }
    }
    return true;
  }

  getAnContent() {
    for (let i = 0; i < this.info.subs.length; i++) {
      if (this.info.subs[i].type === '简' || this.info.subs[i].type === '简答') {
        const j = new ShortAns;
        j.title = this.info.subs[i].title;
        j.number = this.info.subs[i].number;
        j.content = this.info.subs[i].shAns[0].answer;
        this.shortAns.push(j);
      }
    }
  }
  getOptContent() {
    for (let i = 0; i < this.info.subs.length; i++) {
      if (this.info.subs[i].type === '单选' || this.info.subs[i].type === '多选题') {
        const j = new Opti;
        j.title = this.info.subs[i].title;
        j.number = this.info.subs[i].number;
        j.type = this.info.subs[i].type;
        for (const option of this.info.subs[i].options) {
          if (option.select_count === 1) {
            j.opt.push(option.number);
            j.optContent.push(option.title);
          }
        }
        this.option.push(j);
      }
    }
  }
}



