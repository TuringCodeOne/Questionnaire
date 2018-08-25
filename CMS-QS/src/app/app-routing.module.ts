import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QestionnaireComponent } from './components/qestionnaire/qestionnaire.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { MakeComponent } from './components/admin/make/make.component';
import { EditComponent } from './components/admin/edit/edit.component';
import { DesignComponent } from './components/admin/edit/design/design.component';
import { AnalyseComponent } from './components/admin/edit/analyse/analyse.component';
import { PreviewComponent } from './components/admin/edit/preview/preview.component';
import { MineComponent } from './components/admin/mine/mine.component';
import { BlankComponent } from './components/admin/blank/blank.component';
import { MainComponent } from './components/main/main.component';

const blankroutes: Routes = [
  // TODO
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

const editroutes: Routes = [
  {path: 'design/:id', component: DesignComponent},
  {path: 'analyse/:id', component: AnalyseComponent},
  {path: 'preview/:id', component: PreviewComponent},
  {path: '**', redirectTo: '/admin', pathMatch: 'full'},
];

const adminroutes: Routes = [
  {path: '', component: MineComponent},
  {path: 'mine', component: MineComponent},
  {path: 'make', component: MakeComponent},
  {path: 'blank', component: BlankComponent},
  {path: 'edit', component: EditComponent, children: editroutes},
  {path: '**', redirectTo: '/admin', pathMatch: 'full'},
];


const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'admin/login', component: LoginComponent},
  {path: 'admin', component: AdminComponent, children: adminroutes},
  {path: ':id', component: QestionnaireComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false, useHash: true})],
exports: [RouterModule]
})
export class AppRoutingModule { }
