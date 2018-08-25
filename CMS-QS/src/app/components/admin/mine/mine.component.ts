import { Component, OnInit } from '@angular/core';
import { QuestionnaireService } from '../../../services/questionnaire/questionnaire.service';
import { QuestionnairePojo } from '../../../Entities/QuesPojo';
import { AdminService } from './../../../services/admin/admin.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
  group,
  query,
  stagger,
  animateChild,
} from '@angular/animations';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.css'],
  animations: [
    trigger('flyInOut', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
  query(':enter', stagger(400, [
    style({ transform: 'translateY(100%)' }),
    animate('0.1s ease-in-out', style({ transform: 'translateY(0)', opacity: 1 })),
]), { optional: true }
)])])]
})
export class MineComponent implements OnInit {
  value = 'panel-info';
  panel;
  isPut = true;
  ismonitor = false;
  quesAll: QuestionnairePojo[] = [];
  constructor(private qservice: QuestionnaireService,
  private adminservice: AdminService) { }

  async ngOnInit() {
    const backup = await this.qservice.fetchAllQuesInfo();
    this.quesAll = backup;
    console.log(backup);
  }
  async putout(id: number) {
    // TODO net request
    const isnt = await this.adminservice.updateStatus(id, 1);
    if (isnt.success) {
    const backup = await this.qservice.fetchAllQuesInfo();
    this.quesAll = backup;
    }
  }
  async reclaim(id: number) {
    const isnt = await this.adminservice.updateStatus(id, 0);
    if (isnt.success) {
    const backup = await this.qservice.fetchAllQuesInfo();
    this.quesAll = backup;
    }
  }
  async delete(id: number) {
    const isnt = await this.adminservice.delete(id);
    if (isnt.success) {
      const backup = await this.qservice.fetchAllQuesInfo();
      this.quesAll = backup;
      }
  }
}
