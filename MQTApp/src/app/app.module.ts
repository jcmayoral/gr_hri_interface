import { User } from './shared/user';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
//mport { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage';


@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy, }, Storage],
    bootstrap: [AppComponent]
})
export class AppModule {}
