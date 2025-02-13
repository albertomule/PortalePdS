import { NgModule } from '@angular/core';
import { RootComponent } from './root.component';
import { BrowserModule } from '@angular/platform-browser';
import { RoutingModule } from '../routing.module';
import { LoginComponent } from '../componenti/login/login.component';
import { HomestudenteComponent } from '../componenti/homestudente/homestudente.component';
import { HomecommissioneComponent } from '../componenti/homecommissione/homecommissione.component';
import { PdsComponent } from '../componenti/pds/pds.component';
import { RegolamentiComponent } from '../componenti/regolamenti/regolamenti.component';
import { EsamiComponent } from '../componenti/esami/esami.component';
import { NuovoregolamentoComponent } from '../componenti/nuovoregolamento/nuovoregolamento.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatRadioModule} from '@angular/material/radio'
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { RegolamentoComponent } from '../componenti/regolamento/regolamento.component';
import { NuovopianoComponent } from '../componenti/nuovopiano/nuovopiano.component';
import { PianiapprovatiComponent } from '../componenti/pianiapprovati/pianiapprovati.component';
import { PianiinsospesoComponent } from '../componenti/pianiinsospeso/pianiinsospeso.component';
import { PianoComponent } from '../componenti/piano/piano.component';
import { AuthComponent } from '../componenti/auth/auth.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  declarations: [
    RootComponent, 
    LoginComponent, 
    HomestudenteComponent, 
    HomecommissioneComponent, 
    PdsComponent, 
    RegolamentiComponent, 
    EsamiComponent, 
    NuovoregolamentoComponent,
    RegolamentoComponent,
    NuovopianoComponent,
    PianiapprovatiComponent,
    PianiinsospesoComponent,
    PianoComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatSelectModule, 
    BrowserAnimationsModule, 
    MatPaginatorModule,
    MatRadioModule,
    HttpClientModule,
    OAuthModule.forRoot()
  ],
  bootstrap: [RootComponent],
  providers: [
    provideHttpClient(),
    provideOAuthClient(),
    provideAnimationsAsync()
  ]
})

export class RootModule {}
