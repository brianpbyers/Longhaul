import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BusServiceProvider } from '../../providers/bus-service/bus-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';

import { LoginPage } from '../login/login';
import { UserPage } from '../user/user';
import { SignupPage } from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-eta',
  templateUrl: 'eta.html',
})
export class EtaPage {

  busRoute: any;
  busStop: any;
  busStopNumber: any;
  bus: any;
  ETA: any;
  

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private busService: BusServiceProvider,
    private userService: UserServiceProvider
  ) {}

  ionViewDidLoad() {
    this.busService.getUpdate().subscribe((res) => {
      this.busRoute = this.busService.selectedRoute.name;
      this.busStop = this.busService.selectedStop.name;
      this.busStopNumber = this.busService.selectedStop.number;
      this.bus = this.busService.selectedBus.bus;
      this.ETA = Math.floor((res.eta - Date.now()) / 1000 / 60) + ' minutes'; 
    })


    this.updateEta();
  }

  updateEta() {
    setInterval(() => {
      this.busService.getUpdate().subscribe((res) => {

        // console.log('route: ', res.route);
        // console.log('stop: ', res.stop);
        // console.log('bus: ', res.bus);
        // console.log('eta: ', res.eta);
        
        this.ETA = Math.floor((res.eta - Date.now()) / 1000 / 60) + ' minutes'; 
      })
    }, 120000)
  };


  saveRoute(routeToSave = {
    route_name: this.busRoute,
    stop_number: this.busStopNumber
  }) {
    if (this.userService.isLoggedIn == true) {
      // console.log(this.userService.isLoggedIn);
      this.navCtrl.push(UserPage, routeToSave);
    } else {
      this.navCtrl.push(SignupPage);
    }
  }

  logIn() {
    this.navCtrl.push(LoginPage)
  }
  
}
