import { Component, NgModule } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormsModule } from '@angular/forms';

import { UserServiceProvider } from '../../providers/user-service/user-service';
import { BusServiceProvider } from '../../providers/bus-service/bus-service';

import { UserPage } from '../user/user';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  newUser = {
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
    if (this.selectedStop){
      this.routeToSave = {
        route_name: this.busService.selectedRoute.name,
        stop_number: this.busService.selectedStop.number
      }
    }
  }

 createAccount(newUser){
      if (newUser.name && newUser.password){
        this.userService.signUp(newUser).then((result) => {
            if (this.routeToSave) {
              console.log('saving route')
              this.userService.saveNewRoute(this.routeToSave)
            };
            this.navCtrl.push(UserPage)
        }, (err) => {
          alert(err);
        })
      } else {
        alert('Please include both user name and password')
    }
  }
};
