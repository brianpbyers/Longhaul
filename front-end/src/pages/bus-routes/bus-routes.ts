import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BusServiceProvider } from '../../providers/bus-service/bus-service';

import { BusStopsPage } from '../bus-stops/bus-stops';

@IonicPage()
@Component({
  selector: 'page-bus-routes',
  templateUrl: 'bus-routes.html',
})
export class BusRoutesPage implements OnInit {

  routes: any;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private busService: BusServiceProvider
  ) {}

  ngOnInit(){
    this.busService.getRoutes();
  }

  selectStop(){
    this.navCtrl.push(BusStopsPage)
  }

  ionViewDidLoad() {
  }

}
