import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertComponent } from '../alert/alert.component';
import { LoginoutService } from '../../services/loginout/loginout.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild(AlertComponent)
  private alert: AlertComponent;

  constructor(
    private router: Router,
    private loginoutService: LoginoutService) { }

  username = '';
  password = '';

  ngOnInit() {
  }

  async onLogin() {
    const username = this.username;
    const password = this.password;
    if (username === '' || password === '') {
      this.alert.show('info', '用户名或密码为空');
      return;
    }
    if (password.length < 6) {
      this.alert.show('info', '密码格式错误');
      return;
    }
    // TODO 网络请求
    const result = await this.loginoutService.login(username, password);
    if (result) {
      this.router.navigate(['/admin'], { replaceUrl: true });
    } else {
      this.alert.show('warning', '用户名或密码错误！');
    }
  }
}
