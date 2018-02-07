import { Component } from '@angular/core';

import { UserServiceProvider } from '../../providers/user-service/user-service';

import { FavoritesPage } from '../favorites/favorites';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { UserPage } from '../user/user';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  isLoggedIn = this.userService.isLoggedIn;

  constructor(
    private userService: UserServiceProvider
  ) {}



  tab1Root = HomePage;
  tab2Root = SignupPage;
  tab3Root = UserPage;
  tab4Root = AboutPage;
  


}

