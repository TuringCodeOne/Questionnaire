import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';
import { LoginoutService } from './services/loginout/loginout.service';
import { AdminService } from './services/admin/admin.service';
import { QuestionnaireService } from './services/questionnaire/questionnaire.service';
import { SubjectService } from './services/subject/subject.service';

import { AppComponent } from './app.component';
import { QestionnaireComponent } from './components/qestionnaire/qestionnaire.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { MakeComponent } from './components/admin/make/make.component';
import { EditComponent } from './components/admin/edit/edit.component';
import { DesignComponent } from './components/admin/edit/design/design.component';
import { AnalyseComponent } from './components/admin/edit/analyse/analyse.component';
import { PreviewComponent } from './components/admin/edit/preview/preview.component';
import { AlertComponent } from './components/alert/alert.component';
import { MineComponent } from './components/admin/mine/mine.component';
import { BlankComponent } from './components/admin/blank/blank.component';
import { HttpModule } from '@angular/http';
import { MainComponent } from './components/main/main.component';



@NgModule({
  declarations: [
    AppComponent,
    QestionnaireComponent,
    AdminComponent,
    LoginComponent,
    MakeComponent,
    EditComponent,
    DesignComponent,
    AnalyseComponent,
    PreviewComponent,
    AlertComponent,
    BlankComponent,
    MainComponent,
    MineComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    NgxEchartsModule,
    HttpModule
  ],
  providers: [
    LoginoutService,
    AdminService,
    QuestionnaireService,
    SubjectService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
