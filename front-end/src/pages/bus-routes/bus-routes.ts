import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BusServiceProvider } from '../../providers/bus-service/bus-service';

import { BusStopsPage } from '../bus-stops/bus-stops';

@IonicPage()
@Component({
  selector: 'page-bus-routes',
  templateUrl: 'bus-routes.html'
})
export class BusRoutesPage implements OnInit {

  routes: any;
  selectedRoute: any;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private busService: BusServiceProvider
  ) {}
  ngOnInit(){
    // this.busService.getRoutes().subscribe((response) => {
    //   this.routes = response
    //   console.log('routes: ', this.routes)
    // }); 
  }

  ionViewWillLoad(){
    this.busService.getRoutes().subscribe((response) => {
      this.routes = response
      // console.log('routes: ', this.routes)
    }); 
  }

  goToStopsPage(route){
    // console.log(route);
    this.selectedRoute = route;
    // console.log(selectedRoute);
    this.busService.getStops(this.selectedRoute)
    this.ionViewWillLeave();
  }

  ionViewWillLeave(){
    this.navCtrl.push(BusStopsPage, this.selectedRoute);
  }

}
