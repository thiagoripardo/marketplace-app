import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Shop } from '../../domain/store/shop';

/*
  Generated class for the Shop page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html'
})
export class ShopPage {

  public shop: Shop;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.shop = this.navParams.get('shopSelect');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');
  }

}
