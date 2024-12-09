import { Routes } from '@angular/router';
import { HomeComponent } from "./presentation/pages/home/home.component";
import { RegisterComponent } from "./presentation/pages/register/register.component";
import { LoginComponent } from "./presentation/pages/login/login.component";
import { DashboardComponent } from "./presentation/pages/dashboard/dashboard.component";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
];
