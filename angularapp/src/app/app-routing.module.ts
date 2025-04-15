import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { CreateinternshipComponent } from './components/createinternship/createinternship.component';
import { RequestedinternshipComponent } from './components/requestedinternship/requestedinternship.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './components/authguard/auth.guard';
import { ViewinternshipComponent } from './components/viewinternship/viewinternship.component';
import { UserviewinternshipComponent } from './components/userviewinternship/userviewinternship.component';
import { UserappliedinternshipComponent } from './components/userappliedinternship/userappliedinternship.component';
import { AdmineditinternshipComponent } from './components/admineditinternship/admineditinternship.component';
import { InternshipformComponent } from './components/internshipform/internshipform.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import {InternshippiechartComponent } from './components/internshippiechart/internshippiechart.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent },
  {path: 'signup', component: RegistrationComponent },
  {path: 'error', component: ErrorComponent },
  {path: 'admin/add/newinternship', component: CreateinternshipComponent, canActivate: [AuthGuard]},
  {path: 'admin/view/viewinternship', component: ViewinternshipComponent, canActivate: [AuthGuard]},
  {path :'user/view/viewinternship', component: UserviewinternshipComponent, canActivate: [AuthGuard]},
  {path: 'admin/editinternship/:id', component: AdmineditinternshipComponent , canActivate: [AuthGuard]},
  {path: 'user/internshipapplicationform', component: InternshipformComponent , canActivate: [AuthGuard]},
  {path :'admin/view/feedback', component: AdminviewfeedbackComponent, canActivate: [AuthGuard]},
  {path :'user/view/feedback', component: UserviewfeedbackComponent, canActivate: [AuthGuard]},
  {path :'user/add/feedback', component: UseraddfeedbackComponent, canActivate: [AuthGuard]},
  {path: 'user/view/appliedinternship', component: UserappliedinternshipComponent, canActivate: [AuthGuard]},
  {path: 'admin/view/requestedinternship', component: RequestedinternshipComponent, canActivate: [AuthGuard]},
  { path: 'internshippiechart', component: InternshippiechartComponent },
  { path: '**', redirectTo: '/error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
