import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberComponent } from './member/member.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArticlesComponent } from './articles/articles.component';
import { ToolsComponent } from './tools/tools.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';
import { EventCreateComponent } from './event-create/event-create.component';
import { ToolsCreateComponent } from './tools-create/tools-create.component';
import { EnseignantFormComponent } from './enseignant-form/enseignant-form.component';
import { EtudiantFormComponent } from './etudiant-form/etudiant-form.component';
import { AuthGuard } from 'src/services/auth-guard.service';

// pathMatch : maycharjiha ella mayel9a kelmet 'members'
// lkol sinon yredirectih vers un path ena nakhtarou



const routes: Routes = [

  {path:'dashboard', pathMatch:'full', component:DashboardComponent ,canActivate: [AuthGuard]},
  {path:'articles', pathMatch:'full', component:ArticlesComponent ,canActivate: [AuthGuard]},

  {path:'enseignant/create', pathMatch:'full', component:EnseignantFormComponent ,canActivate: [AuthGuard]},
  {path:'etudiant/create', pathMatch:'full', component:EtudiantFormComponent ,canActivate: [AuthGuard]},
  {
    path: 'tools', children: [
      { path: '', pathMatch: 'full', component: ToolsComponent },
      { path: 'create', pathMatch: 'full', component: ToolsCreateComponent },
      { path: ':id/edit', pathMatch: 'full', component: ToolsCreateComponent },
      { path: ':id/delete', pathMatch: 'full', component: ToolsCreateComponent }
    ], canActivate: [AuthGuard]
  },

  {
    path: 'events', 
    children: [
      { path: '', pathMatch: 'full', component: EventsComponent },
      { path: 'create', pathMatch: 'full', component: EventCreateComponent },
      { path: ':id/edit', pathMatch: 'full', component: EventCreateComponent }
    ], 
    canActivate: [AuthGuard]
  },



  {path:'members',
  children:[
    {path: '', pathMatch:'full', component:MemberComponent},
    {path:'enseignant/:id/edit', pathMatch:'full', component:EnseignantFormComponent},
    {path:'enseignant/:id/delete', pathMatch:'full', component:EnseignantFormComponent},
    {path:'etudiant/:id/edit', pathMatch:'full', component:EtudiantFormComponent},
    {path:'etudiant/:id/delete', pathMatch:'full', component:EtudiantFormComponent},
    {path:'create', pathMatch:'full', component:MemberFormComponent},

  ], canActivate: [AuthGuard]},

  {path:'login', pathMatch:'full', component:LoginComponent},
  // {path:':id/edit', pathMatch:'full', component:MemberFormComponent},
  // {path:':id/delete', pathMatch:'full', component:MemberFormComponent},
  // {path:'create', pathMatch:'full', component:MemberFormComponent},

  {path:'', pathMatch:'full', redirectTo:'login'},
  {path:'**', redirectTo:'dashboard'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
