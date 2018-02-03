import { Component } from '@angular/core';

import { FavoritesPage } from '../favorites/favorites';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SignupPage;
  tab3Root = FavoritesPage;

  constructor() {

  }
}

