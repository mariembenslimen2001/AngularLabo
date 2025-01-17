import { NgModule } from '@angular/core';

import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormGroup, FormControl,FormsModule, ReactiveFormsModule, FormGroupDirective, NgForm} from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemberComponent } from './member/member.component';
import { MemberFormComponent } from './member-form/member-form.component';

import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
 import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './layout/layout.component';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';

import { ArticlesComponent } from './articles/articles.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToolsComponent } from './tools/tools.component';
import { EventsComponent } from './events/events.component';
import { FirebaseModule} from './Firebase.module';
import { LoginComponent } from './login/login.component';
import { EventCreateComponent } from './event-create/event-create.component';

import {JsonPipe} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { ToolsCreateComponent } from './tools-create/tools-create.component';

import {MatDialogModule} from "@angular/material/dialog";
import { NgChartsModule } from 'ng2-charts';
import { EnseignantFormComponent } from './enseignant-form/enseignant-form.component';
import { EtudiantFormComponent } from './etudiant-form/etudiant-form.component';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { MatSortModule} from '@angular/material/sort';
import { MatPaginatorModule} from '@angular/material/paginator';
import { AffecterEnseignantComponent } from './affecter-enseignant/affecter-enseignant.component';
import { AffecterMemberComponent } from './affecter-member/affecter-member.component';
import {MatChipsModule} from '@angular/material/chips';
import { ConsulterMemberComponent } from './consulter-member/consulter-member.component';
import { ConsulterInvitesComponent } from './consulter-invites/consulter-invites.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ArticleCreateComponent } from './article-create/article-create.component';

@NgModule({
  declarations: [

    AppComponent,
    MemberComponent,
    MemberFormComponent,
    LayoutComponent,
    ArticlesComponent,
    DashboardComponent,
    ToolsComponent,
    EventsComponent,
    LoginComponent,
    EventCreateComponent,
    ToolsCreateComponent,
    EnseignantFormComponent,
    EtudiantFormComponent,
    AffecterEnseignantComponent,
    AffecterMemberComponent,
    ConsulterMemberComponent,
    ConsulterInvitesComponent,
    ArticleCreateComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatIconModule,

    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,

    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule,

    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,


    FirebaseModule,
    MatCardModule,
    JsonPipe,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    NgChartsModule,
    MatSelectModule,
    MatSortModule,
    MatPaginatorModule,
    MatChipsModule,
    DragDropModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

