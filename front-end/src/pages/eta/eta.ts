import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BusServiceProvider } from '../../providers/bus-service/bus-service';

import { LoginPage } from '../login/login';
import { UserPage } from '../user/user';

@IonicPage()
@Component({
  selector: 'page-eta',
  templateUrl: 'eta.html',
})
export class EtaPage {

  busRoute: any;
  busStop: any;
  bus: any;
  ETA: any;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private busService: BusServiceProvider
  ) {}

  ionViewDidLoad(){
    this.busService.getUpdate().subscribe((res) => {
      console.log(res);
    })
  }

  saveRoute(){
    this.navCtrl.push(UserPage)
  }

  logIn(){
    this.navCtrl.push(LoginPage)
  }

}
