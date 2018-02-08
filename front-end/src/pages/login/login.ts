import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserServiceProvider } from '../../providers/user-service/user-service';
import { BusServiceProvider } from '../../providers/bus-service/bus-service';

import { UserPage } from '../user/user';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {
    name: '',
    password: ''
  }

  routeToSave: any;
  selectedStop = this.busService.selectedStop;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private userService: UserServiceProvider,
    private busService: BusServiceProvider
  ) {}

  ionViewDidLoad(){
  if(this.selectedStop) {
    this.routeToSave = {
      route_name: this.busService.selectedRoute.name,
      stop_number: this.busService.selectedStop.number
      }
    }
  }

  userLogin(user){
      if (user.name && user.password){
      this.userService.userLogin(user).then((result) => {
        // saves the new route once the user has been logged in
        if (this.routeToSave) {
          // console.log('here is your saved route: ', this.routeToSave)
          this.userService.saveNewRoute(this.routeToSave);
        };
        this.navCtrl.push(UserPage);
      }, (err) => {
        alert(err);
      })
    } else {
      alert('Please include both user name and password')
      }
    }
  }
