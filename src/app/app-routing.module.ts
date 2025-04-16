import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';
import { TrainerFormComponent } from './trainer-form/trainer-form.component';
import { TrainerListComponent } from './trainer-list/trainer-list.component';


const routes: Routes = [
  { path: 'addNewTrainer', component: TrainerFormComponent },
  { path: 'viewTrainers', component: TrainerListComponent },
  { path: 'confirmDelete/:id', component: DeleteConfirmComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
