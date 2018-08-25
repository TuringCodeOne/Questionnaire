import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionnaireService } from './../../../services/questionnaire/questionnaire.service';
import { AlertComponent } from '../../alert/alert.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.css']
})
export class BlankComponent implements OnInit {

  title = '';
  emailTitle = '';
  description = '';
  emailCont = '';
  isntReply = 0;
  addEmail = true;

  @ViewChild(AlertComponent)
  private alert: AlertComponent;

  constructor(private question: QuestionnaireService,
            private router: Router) { }

  ngOnInit() {
  }

  adEmail() {
    this.addEmail = false;
    this.isntReply = 1;
  }
  calEmail() {
    this.addEmail = true;
    this.isntReply = 0;
  }
  async onCreate() {
    if (this.title === '') {
      this.alert.show('info', '标题不能为空');
      return;
    }
    if (this.isntReply === 1) {
      if (this.emailTitle === '' || this.emailCont === '') {
        this.alert.show('info', '您没有将邮件信息添加完整，如不需要，请点击取消!');
        return;
      }
    }
    const resp = await this.question.createQue(this.title, this.description, this.emailTitle, this.emailCont, this.isntReply);
    if (resp.success) {
      this.router.navigate(['/admin/edit/design', resp.id], {replaceUrl: true});
    } else {
      this.alert.show('danger', '创建失败，请重试！');
    }
    return;
  }

}
