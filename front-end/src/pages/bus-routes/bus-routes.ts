import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BusStopsPage } from '../bus-stops/bus-stops';

/**
 * Generated class for the BusRoutesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bus-routes',
  templateUrl: 'bus-routes.html',
})
export class BusRoutesPage {
  public items = ['shoes', 'coffee', 'tigers', 'triscuits', 'onions', 'laptops', 'buses', ]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    for(let i=0; i<100; i++){
      this.items.push(`item ${i}`);
    }
  }

  selectStop(){
    this.navCtrl.push(BusStopsPage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusRoutesPage');
  }

}
