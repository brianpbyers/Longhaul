import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BusServiceProvider } from '../../providers/bus-service/bus-service';

import { BusStopsPage } from '../bus-stops/bus-stops';

@IonicPage()
@Component({
  selector: 'page-bus-routes',
  templateUrl: 'bus-routes.html'
})
export class BusRoutesPage{

  routes: any;


  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private busService: BusServiceProvider
  ) {}

  ionViewWillEnter(){
    this.busService.getRoutes().subscribe((response) => {
      this.routes = response
      // console.log('routes: ', this.routes)
    }); 
  }

  goToStopsPage(route){
    // console.log(route);
    this.busService.setRoute(route);
    this.navCtrl.push(BusStopsPage);  
  }
}
