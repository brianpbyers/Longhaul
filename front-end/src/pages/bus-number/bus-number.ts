import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EtaPage } from '../eta/eta';

@IonicPage()
@Component({
  selector: 'page-bus-number',
  templateUrl: 'bus-number.html',
})
export class BusNumberPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  getETA(){
    this.navCtrl.push(EtaPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusNumberPage');
  }

}
