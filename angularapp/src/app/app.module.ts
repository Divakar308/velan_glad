import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ErrorComponent } from './components/error/error.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateinternshipComponent } from './components/createinternship/createinternship.component';
import { RequestedinternshipComponent } from './components/requestedinternship/requestedinternship.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ViewinternshipComponent } from './components/viewinternship/viewinternship.component';
import { UserviewinternshipComponent } from './components/userviewinternship/userviewinternship.component';
import { UserappliedinternshipComponent } from './components/userappliedinternship/userappliedinternship.component';
import { CommonModule } from '@angular/common';
import { AdmineditinternshipComponent } from './components/admineditinternship/admineditinternship.component';
import { InternshipformComponent } from './components/internshipform/internshipform.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { InternshippiechartComponent } from './components/internshippiechart/internshippiechart.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ErrorComponent,
    CreateinternshipComponent,
    NavbarComponent,
    RequestedinternshipComponent,
    ViewinternshipComponent,
    UserviewinternshipComponent,
    UserappliedinternshipComponent,
    AdmineditinternshipComponent,
    InternshipformComponent,
    AdminviewfeedbackComponent,
    UserviewfeedbackComponent,
    UseraddfeedbackComponent,
    AdminnavComponent,
    UsernavComponent,
    InternshippiechartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
