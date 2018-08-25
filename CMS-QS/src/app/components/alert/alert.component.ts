import { Component, OnInit } from '@angular/core';

export type MsgType = 'success' | 'info' | 'warning' | 'danger';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  successMsg = '';
  infoMsg = '';
  warningMsg = '';
  dangerMsg = '';

  curType: MsgType = 'info';

  constructor() { }

  ngOnInit() {
  }

  show(type: MsgType = 'info', msg: string = '') {
    this.curType = type;
    this.setMsg(type, msg);
  }

  hide(type = this.curType) {
    this.setMsg(type, '');
  }

  private setMsg(type: MsgType, msg: string) {
    switch (type) {
      case 'success':
        this.successMsg = msg;
        break;
      case 'info':
        this.infoMsg = msg;
        break;
      case 'warning':
        this.warningMsg = msg;
        break;
      case 'danger':
        this.dangerMsg = msg;
        break;
    }
  }
}
