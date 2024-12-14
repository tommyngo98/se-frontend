import { Routes } from '@angular/router';
import { HomeComponent } from "./presentation/pages/home/home.component";
import { RegisterComponent } from "./presentation/pages/register/register.component";
import { LoginComponent } from "./presentation/pages/login/login.component";
import { DashboardComponent } from "./presentation/pages/dashboard/dashboard.component";
import { DashboardRouteGuard } from "./route-guards/dashboard.route-guard";
import { LoginRouteGuard } from "./route-guards/login.route-guard";
import {ConfirmEmailComponent} from "./presentation/pages/confirm-email/confirm-email.component";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login',
    component: LoginComponent,
    canActivate: [LoginRouteGuard]
  },
  { path: 'confirm-email', component: ConfirmEmailComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard',
    component: DashboardComponent,
    canActivate: [DashboardRouteGuard],
  },
];
