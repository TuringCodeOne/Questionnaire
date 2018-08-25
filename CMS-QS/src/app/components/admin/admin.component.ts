import { Component, OnInit } from '@angular/core';
import { LoginoutService } from '../../services/loginout/loginout.service';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  search = '';

  constructor(
    private adminService: AdminService,
    private loginoutService: LoginoutService,
    private router: Router) { }

  ngOnInit() {
    if (!this.adminService.isLogin()) {
      this.router.navigate(['/admin/login'], { replaceUrl: true });
    }
  }

  onLogout() {
    // TODO
    this.loginoutService.clear();
    this.router.navigate(['/admin/login'], { replaceUrl: true });
  }


}
