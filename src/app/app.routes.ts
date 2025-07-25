import { Routes } from '@angular/router';
import { HomeComponent } from '../app/components/home/home.component';
import { LoginComponent } from '../app/components/login/login.component';
import { TiposComponent } from '../app/components/tipos/tipos.component';
import { AuthGuard } from '../app/service/auth/auth.guard';
import { ContaComponent } from './components/conta/conta.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExtratoComponent } from './components/extrato/extrato.component';
import { MoradorComponent } from './components/morador/morador.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  {
    path: '', component: HomeComponent, canActivate: [AuthGuard], children: [
      { path: 'tipos', component: TiposComponent },
      { path: 'morador', component: MoradorComponent },
      { path: 'contas', component: ContaComponent },
      { path: 'extratos', component: ExtratoComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: '', redirectTo: 'tipos', pathMatch: 'full' },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];