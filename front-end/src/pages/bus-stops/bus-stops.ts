import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BusServiceProvider } from '../../providers/bus-service/bus-service';

import { BusNumberPage } from '../bus-number/bus-number';

@IonicPage()
@Component({
  selector: 'page-bus-stops',
  templateUrl: 'bus-stops.html',
})
export class BusStopsPage  {

  stops: any;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private busService: BusServiceProvider
  ) {}

  ionViewWillEnter(){
    this.busService.getStops().subscribe((res) => {
      this.stops = res.stops;
      console.log( 'here', this.stops);
    })
  }

  goToBusPage(stop){
    this.busService.setStop(stop);
    this.navCtrl.push(BusNumberPage);
  }

}
