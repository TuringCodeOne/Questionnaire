import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from './../../../../services/admin/admin.service';
import { QuestionnaireService } from './../../../../services/questionnaire/questionnaire.service';
import { SubjectService } from './../../../../services/subject/subject.service';
import { AlertComponent } from '../../../alert/alert.component';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {

  @ViewChild(AlertComponent)
  private alert: AlertComponent;
  isnt = false;
  subtype = true;
  addSub = true;
  selectone = false;
  selectmany = false;
  selectshort = false;
  addopt = true;
  optContent = '';
  optsContent: string[] = [];
  optsPreview = false;
  info;
  id: string;
  BigOrLittle = false;

  // 新题目数据

  title = '';
  type: string;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private adminservice: AdminService,
    private questionservice: QuestionnaireService,
    private subjectservice: SubjectService) { }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    // console.log(id);
    if (!this.adminservice.isLogin()) {
      this.router.navigate(['/admin/login'], { replaceUrl: true });
    }
    this.info = await this.questionservice.fetchQuesAllInfo(this.id);
    this.isnt = true;
  }

  AddSub() {
    this.addSub = !this.addSub;
  }
  CancelSub() {
    this.addSub = !this.addSub;
    this.initValue();
  }
  SelectOne() {
    this.selectmany = this.selectone = this.selectshort = true;
    this.type = '单选';
    this.subtype = false;
  }
  SelectMany() {
    this.selectmany = this.selectone = this.selectshort = true;
    this.type = '多选题';
    this.subtype = false;
  }
  SelectShort() {
    this.selectshort = true;
    this.type = '简';
    this.selectmany = this.selectone = false;
    this.subtype = false;
  }
  getCheck(id: string) {
    if (id === '1') {
      this.type = '简';
    }
    if (id === '2') {
      this.type = '简答';
    }
    this.BigOrLittle = true;
  }
  changeAddopt() {
    this.addopt = !this.addopt;
  }
  addOpt() {
    if (this.optContent === '') {
      this.alert.show('warning', '添加失败！选项内容不能为空！');
      return;
    }
    this.optsContent.push(this.optContent);
    this.optContent = '';
    this.optsPreview = true;
    // console.log(this.optsContent);
  }
  async add() {
    if (this.title === '') {
      this.alert.show('warning', '添加失败，题目信息未填写!');
      return;
    }

    if (this.type === '多选题' || this.type === '单选') {
      if (this.optsContent.length < 2) {
        this.alert.show('warning', '选择题的选项至少设置两项');
        return;
      }
      const optIsnt = await this.subjectservice.createOptSubject(this.id, this.type, this.title, this.optsContent);
      if (optIsnt.success) {
        this.initValue();
        this.info = await this.questionservice.fetchQuesAllInfo(this.id);
        this.alert.show('info', '创建成功!');
        return;
      }
    }
    if (this.BigOrLittle === false) {
      this.alert.show('warning', '请选择答题框的大小!');
      return;
    }
    const shortIsnt = await this.subjectservice.createShortSubject(this.id, this.type, this.title);
    if (shortIsnt.success) {
      this.initValue();
      this.info = await this.questionservice.fetchQuesAllInfo(this.id);
      this.alert.show('info', '创建成功');
      return;
    }
  }
  initValue() {
    this.subtype = this.addSub = this.addopt = true;
    this.selectone = this.selectmany = this.selectshort = this.optsPreview = false;
    this.optContent = '';
    this.optsContent = [];
    this.title = '';
  }
  back() {
    this.router.navigate(['/admin/mine'], {replaceUrl: true});
  }
}
