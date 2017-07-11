import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { PerfilPage } from '../pages/perfil/perfil';
import { CartPage } from '../pages/cart/cart';
import { UserShopPage } from '../pages/user-shop/user-shop';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoginPage;

  public pages = [
    { title: 'Perfil', component: PerfilPage },
    { title: 'Minhas lojas', component: UserShopPage },
    { title: 'Meu carrinho', component: CartPage }
  ];

  @ViewChild(Nav) public nav: Nav;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {

    this.nav.push(page.component);
  }
}
