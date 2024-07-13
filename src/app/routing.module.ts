import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomestudenteComponent } from './componenti/homestudente/homestudente.component';
import { HomecommissioneComponent } from './componenti/homecommissione/homecommissione.component';
import { RootComponent } from './root/root.component';
import { LoginComponent } from './componenti/login/login.component';
import { PdsComponent } from './componenti/pds/pds.component';
import { RegolamentiComponent } from './componenti/regolamenti/regolamenti.component';
import { EsamiComponent } from './componenti/esami/esami.component';
import { NuovoregolamentoComponent } from './componenti/nuovoregolamento/nuovoregolamento.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/start'},
  { path: 'start', component: LoginComponent},
  { path: 'homes', component: HomestudenteComponent},
  { path: 'homec', component: HomecommissioneComponent},
  { path: 'pds', component: PdsComponent},
  { path: 'regolamenti', component: RegolamentiComponent},
  { path: 'esami', component: EsamiComponent},
  { path: 'nuovoregolamento', component: NuovoregolamentoComponent}, 
   
  // { path: '404', component: NotfoundComponent},
  // { path: '**', redirectTo: '/404'}

  // { path: 'contact', component: ContactComponent, canActivate: [authGuard], canActivateChild: [authGuardChild], children: [
  //   { path: ':id', component: ContattoComponent}
  // ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
