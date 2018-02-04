import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BusServiceProvider } from '../../providers/bus-service/bus-service';

import { LoginPage } from '../login/login';
import { UserPage } from '../user/user';

@IonicPage()
@Component({
  selector: 'page-eta',
  templateUrl: 'eta.html',
})
export class EtaPage {

  busRoute: any;
  busStop: any;
  bus: any;
  ETA: any;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private busService: BusServiceProvider
  ) {}

  ionViewDidLoad(){
    this.busService.getUpdate().subscribe((res) => {
      this.busRoute = this.busService.selectedRoute.name;
      this.busStop = this.busService.selectedStop.name;
      this.bus = this.busService.selectedBus.bus;
      this.ETA = (res.eta - Date.now()) / 1000 / 60 + ' minutes'; 
    })
    this.updateEta();
  }

  updateEta(){
    setInterval(() => {
      this.busService.getUpdate().subscribe((res) => {
        // console.log('route: ', res.route);
        // console.log('stop:  ', res.stop);
        // console.log('bus', res.bus);
        // console.log('eta', res.eta);
        
        this.ETA = (res.eta - Date.now()) / 1000 / 60 + ' minutes'; 
      })
    }, 120000)
  }

  saveRoute(){
    this.navCtrl.push(UserPage, {
      route: this.busRoute,
      stop: this.busStop
    })
  }

  logIn(){
    this.navCtrl.push(LoginPage)
  }

}
