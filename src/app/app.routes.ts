import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { TaskComponent } from './pages/Task/Task/Task.component';
import { authGuard } from './guard/auth.guard';
import { TaskCardComponent } from './pages/Task/taskCard/taskCard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'tasks',
    component: TaskComponent,
    canActivate: [authGuard],
    // children: [{ path: ':id', component: TaskCardComponent }],
  },
  { path: 'tasks/:id', component: TaskCardComponent },
];
