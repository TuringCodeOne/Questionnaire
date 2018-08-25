import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionnaireService } from './../../../../services/questionnaire/questionnaire.service';
import { QuesSubject } from './../../../../Entities/QuesPojo';
import { AdminService } from './../../../../services/admin/admin.service';
import { AnalyPojo, AnalysPojo } from './../../../../Entities/AnalyPojo';

@Component({
  selector: 'app-analyse',
  templateUrl: './analyse.component.html',
  styleUrls: ['./analyse.component.css']
})
export class AnalyseComponent implements OnInit {
  // question2 = {
  //   title: {
  //     text: '2.性别',
  //     left: 'center'
  //   },
  //   tooltip: {
  //     trigger: 'item',
  //     formatter: '{a} <br/>{b} : {c} ({d}%)'
  //   },
  //   legend: {
  //     // orient: 'vertical',
  //     // top: 'middle',
  //     bottom: 10,
  //     left: 'center',
  //     data: ['男', '女']
  //   },
  //   series: [
  //     {
  //       type: 'pie',
  //       radius: '65%',
  //       center: ['50%', '50%'],
  //       selectedMode: 'single',
  //       data: [
  //         { value: 35, name: '男' },
  //         { value: 12, name: '女' }
  //       ],
  //       itemStyle: {
  //         emphasis: {
  //           shadowBlur: 10,
  //           shadowOffsetX: 0,
  //           shadowColor: 'rgba(0, 0, 0, 0.5)'
  //         }
  //       }
  //     }
  //   ]
  // };

  // question6 = {
  //   title: {
  //     text: '6.以下哪些项目符合您的情况？（多选题）',
  //     left: 'center'
  //   },
  //   tooltip: {
  //     trigger: 'item',
  //     formatter: '{a} <br/>{b} : {c} ({d}%)'
  //   },
  //   legend: {
  //     // orient: 'vertical',
  //     // top: 'middle',
  //     bottom: 0,
  //     left: 'center',
  //     data: [
  //       '我热爱计算机相关的事物',
  //       '我热爱艺术相关的事物',
  //       '我学过编程语言（例如C++,Java)',
  //       '我喜欢/制作过绘画，平面设计相关的东西',
  //       '我喜欢折腾硬件',
  //       '其他'
  //     ]
  //   },
  //   series: [
  //     {
  //       type: 'pie',
  //       radius: '65%',
  //       center: ['50%', '50%'],
  //       selectedMode: 'single',
  //       data: [
  //         { value: 8, name: '我热爱计算机相关的事物' },
  //         { value: 12, name: '我热爱艺术相关的事物' },
  //         { value: 16, name: '我学过编程语言（例如C++,Java)' },
  //         { value: 3, name: '我喜欢/制作过绘画，平面设计相关的东西' },
  //         { value: 2, name: '我喜欢折腾硬件' },
  //         { value: 14, name: '其他' }
  //       ],
  //       itemStyle: {
  //         emphasis: {
  //           shadowBlur: 10,
  //           shadowOffsetX: 0,
  //           shadowColor: 'rgba(0, 0, 0, 0.5)'
  //         }
  //       }
  //     }
  //   ]
  // };

  info: AnalysPojo[];
  bigTitle: QuesSubject;
  isnt = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private questionservice: QuestionnaireService,
    private admin: AdminService) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.info = await this.questionservice.getAnswers(id);
    this.bigTitle = await this.questionservice.fetchQuesAllInfo(id);
    this.isnt = true;
    // console.log(this.bigTitle);
    // console.log(this.info);
    // if (this.info.que === null) {
    //   if (this.admin.isLogin()) {
    //     this.router.navigate(['/admin/mine'], {replaceUrl: true});
    //     return;
    //   } else {
    //     this.router.navigate(['/'], {replaceUrl: true});
    //     return;
    //   }
    // }
  }
  back() {
    this.router.navigate(['admin/mine'], {replaceUrl: true});
  }
}
