import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionnaireService } from './../../../../services/questionnaire/questionnaire.service';
import { QuesSubject } from '../../../../Entities/QuesPojo';
import { AdminService } from './../../../../services/admin/admin.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  info: QuesSubject;
  isnt = false;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private questionnaire: QuestionnaireService,
    private admin: AdminService) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.info = await this.questionnaire.fetchQuesAllInfo(id);
    if (this.info.que === null) {
      if (this.admin.isLogin()) {
        this.router.navigate(['/admin/mine'], {replaceUrl: true});
        return;
      } else {
        this.router.navigate(['/'], {replaceUrl: true});
        return;
      }
    }
    this.isnt = true;
  }
  back() {
    this.router.navigate(['/admin/mine'], {replaceUrl: true});
  }

}
