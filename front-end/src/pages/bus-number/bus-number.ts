import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BusServiceProvider } from '../../providers/bus-service/bus-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';

import { BusStopsPage } from '../bus-stops/bus-stops';
import { EtaPage } from '../eta/eta';

@IonicPage()
@Component({
  selector: 'page-bus-number',
  templateUrl: 'bus-number.html',
})
export class BusNumberPage {

  buses: any;
  selectedRoute: any;
  routeDescription: any;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private busService: BusServiceProvider,
    private userService: UserServiceProvider
  ) {}

  ionViewWillEnter(){
    this.busService.getBuses().subscribe((res) => {
      console.log(res)
      this.buses = res;
    this.selectedRoute = this.busService.selectedRoute.name;
    this.routeDescription = this.busService.selectedRoute.description;
    // console.log('this is your route: ', this.selectedRoute, this.routeDescription)
    })
  }

  goToStopsPage(bus){
    this.busService.setBus(bus);
    if (this.userService.goToUserRoute) {
      this.userService.goToUserRoute = false;
      this.navCtrl.push(EtaPage);
    } else {
      this.navCtrl.push(BusStopsPage)
    }
  }
}
