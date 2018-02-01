import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule } from '@angular/common/http'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BusNumberPage } from '../pages/bus-number/bus-number';
import { BusRoutesPage } from '../pages/bus-routes/bus-routes';
import { BusStopsPage } from '../pages/bus-stops/bus-stops';
import { EtaPage } from '../pages/eta/eta';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { UserPage } from '../pages/user/user';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BusNumberPage,
    BusRoutesPage,
    BusStopsPage,
    EtaPage,
    LoginPage,
    SignupPage,
    UserPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BusNumberPage,
    BusRoutesPage,
    BusStopsPage,
    EtaPage,
    LoginPage,
    SignupPage,
    UserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
