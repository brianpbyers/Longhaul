import { Component, NgModule } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormsModule } from '@angular/forms';

import { UserServiceProvider } from '../../providers/user-service/user-service';

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

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private userService: UserServiceProvider
  ) {}

 createAccount(newUser){
  // console.log(`new user ${this.newUser.user_name} created`)
  // console.log(`new user password: ${this.newUser.user_password}`)
  this.userService.signUp(newUser).then((result) => {
    if (this.userService.isLoggedIn) {
      alert(result);
      this.navCtrl.push(UserPage)
    }
  }, (err) => {
    alert(err);
  });
 }
}
