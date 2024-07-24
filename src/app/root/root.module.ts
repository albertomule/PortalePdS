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

@NgModule({
  declarations: [
    RootComponent, 
    LoginComponent, 
    HomestudenteComponent, 
    HomecommissioneComponent, 
    PdsComponent, 
    RegolamentiComponent, 
    EsamiComponent, 
    NuovoregolamentoComponent
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
    HttpClientModule
  ],
  bootstrap: [RootComponent],
})

export class RootModule {}
