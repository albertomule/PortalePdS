import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: '/start'}, ??
  // { path: 'homes', component: HomeStudenteComponent},
  // { path: 'homec', component: HomeCommissioneComponent},
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
