import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TrainerFormComponent } from './trainer-form/trainer-form.component';
import { HeaderComponent } from './header/header.component';
import { TrainerListComponent } from './trainer-list/trainer-list.component';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';




@NgModule({
  declarations: [
    AppComponent,
    TrainerFormComponent,
    HeaderComponent,
    TrainerListComponent,
    DeleteConfirmComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
