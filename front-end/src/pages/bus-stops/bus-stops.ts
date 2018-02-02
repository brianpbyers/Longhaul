import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BusServiceProvider } from '../../providers/bus-service/bus-service';

import { BusNumberPage } from '../bus-number/bus-number';

@IonicPage()
@Component({
  selector: 'page-bus-stops',
  templateUrl: 'bus-stops.html',
})
export class BusStopsPage implements OnInit {

  stops: any;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private busService: BusServiceProvider
  ) {}

  selectedRoute = this.navParams.get('id');
  

  ngOnInit(){
      this.busService.getStops().subscribe((response) => {
      this.stops = response
      console.log('stops ', this.stops);
     })
  }

  getStops(){
  
  }

  goToBusPage(){
    this.navCtrl.push(BusNumberPage)
  }

}
