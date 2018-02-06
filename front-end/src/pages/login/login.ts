import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserServiceProvider } from '../../providers/user-service/user-service';

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

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private userService: UserServiceProvider
  ) {}

  userLogin(user){
      console.log(user);
      if (user.name && user.password){
      this.userService.userLogin(user).then((result) => {
        this.navCtrl.push(UserPage);
      }, (err) => {
        alert(err);
      })
    } else {
      alert('Please include both user name and password')
    }
  };

}
