import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { UserPage } from '../user/user';

@IonicPage()
@Component({
  selector: 'page-eta',
  templateUrl: 'eta.html',
})
export class EtaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  saveRoute(){
    this.navCtrl.push(UserPage)
  }

  logIn(){
    this.navCtrl.push(LoginPage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EtaPage');
  }

}
