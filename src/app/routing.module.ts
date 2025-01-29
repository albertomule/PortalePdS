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
import { RegolamentoComponent } from './componenti/regolamento/regolamento.component';
import { NuovopianoComponent } from './componenti/nuovopiano/nuovopiano.component';
import { PianiapprovatiComponent } from './componenti/pianiapprovati/pianiapprovati.component';
import { PianiinsospesoComponent } from './componenti/pianiinsospeso/pianiinsospeso.component';
import { PianoComponent } from './componenti/piano/piano.component';
import { AuthComponent } from './componenti/auth/auth.component';
import { studenteGuard, commissioneGuard } from './servizi/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/start'},
  { path: 'start', component: LoginComponent},
  { path: 'homes', component: HomestudenteComponent, canActivate: [studenteGuard]},
  { path: 'homec', component: HomecommissioneComponent, canActivate: [commissioneGuard]},
  { path: 'pds', component: PdsComponent, canActivate: [commissioneGuard]},
  // { path: 'regolamenti', component: RegolamentiComponent, children: [
  //   { path: ':id', component: RegolamentoComponent}
  // ]},
  { path: 'regolamenti', component: RegolamentiComponent, canActivate: [commissioneGuard]},
  { path: 'esami', component: EsamiComponent, canActivate: [commissioneGuard]},
  { path: 'nuovoregolamento', component: NuovoregolamentoComponent, canActivate: [commissioneGuard]},
  { path: 'regolamento/:id', component: RegolamentoComponent, canActivate: [commissioneGuard]},
  { path: 'nuovopiano/:id', component: NuovopianoComponent, canActivate: [studenteGuard]},
  { path: 'pianiapprovati', component: PianiapprovatiComponent, canActivate: [commissioneGuard]},
  { path: 'pianiinsospeso', component: PianiinsospesoComponent, canActivate: [commissioneGuard]},
  { path: 'piano/:id', component: PianoComponent, canActivate: [commissioneGuard]},
  { path: 'auth', component: AuthComponent},
   
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
