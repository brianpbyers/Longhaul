import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BusNumberPage } from '../pages/bus-number/bus-number';
import { BusRoutesPage } from '../pages/bus-routes/bus-routes';
import { BusStopsPage } from '../pages/bus-stops/bus-stops';
import { EtaPage } from '../pages/eta/eta';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { UserPage } from '../pages/user/user';
import { TabsPage } from '../pages/tabs/tabs';
import { FavoritesPage } from '../pages/favorites/favorites';
import { AboutPage } from '../pages/about/about';


import { BusServiceProvider } from '../providers/bus-service/bus-service';
import { UserServiceProvider } from '../providers/user-service/user-service';


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
    UserPage,
    TabsPage,
    FavoritesPage,
    AboutPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    FormsModule,
    HttpModule
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
    UserPage,
    TabsPage,
    FavoritesPage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BusServiceProvider,
    UserServiceProvider,
    LocalNotifications
  ]
})
export class AppModule {}
