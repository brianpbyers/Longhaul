import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BusServiceProvider } from '../../providers/bus-service/bus-service';

import { EtaPage } from '../eta/eta';

@IonicPage()
@Component({
  selector: 'page-bus-number',
  templateUrl: 'bus-number.html',
})
export class BusNumberPage {

  buses: any;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private busService: BusServiceProvider
  ) {}

  ionViewWillEnter(){
    this.busService.getStops().subscribe((res) => {
      this.buses = res.buses;
    })
  }

  goToEtaPage(bus){
    this.busService.setBus(bus);
    this.navCtrl.push(EtaPage);
  }
}
