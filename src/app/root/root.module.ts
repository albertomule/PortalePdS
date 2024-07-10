import { NgModule } from '@angular/core';
import { RootComponent } from './root.component';
import { BrowserModule } from '@angular/platform-browser';
import { RoutingModule } from '../routing.module';

@NgModule({
  declarations: [RootComponent],
  imports: [BrowserModule, RoutingModule],
  bootstrap: [RootComponent],
})

export class RootModule {}
