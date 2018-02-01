import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserPage } from '../user/user';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  userPage(){
    this.navCtrl.push(UserPage);
  }

  signUp(){
    alert('You have created an account, ya filthy animal')
    this.navCtrl.push(UserPage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
