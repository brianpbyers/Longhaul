import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BusServiceProvider } from '../../providers/bus-service/bus-service';

import { EtaPage } from '../eta/eta';

@IonicPage()
@Component({
  selector: 'page-bus-stops',
  templateUrl: 'bus-stops.html',
})
export class BusStopsPage  {

  stops: any;
  selectedRoute: any;
  routeDescription: any;
  selectedBus: any;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private busService: BusServiceProvider
  ) {}

  ionViewWillEnter(){
    this.busService.getStops().subscribe((res) => {
      this.stops = res;
      console.log( 'here', this.stops);
    this.selectedRoute = this.busService.selectedRoute.name;
    this.routeDescription = this.busService.selectedRoute.description;
    this.selectedBus = this.busService.selectedBus.bus;
    console.log('selected bus is: ', this.selectedBus);
    })
  }

  goToEtaPage(stop){
    this.busService.setStop(stop);
    this.navCtrl.push(EtaPage);
  }

}
