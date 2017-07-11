import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Shop } from '../../domain/store/shop';
import {Item} from '../../domain/store/item'
import {CartPage} from '../../domain/cart/cart'
/*
  Generated class for the Item page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-item',
  templateUrl: 'item.html'
})
export class ItemPage {
  public shop: Shop;
  public item: Item;

  constructor(public navParams: NavParams, public navCtrl: NavController) {
    //this.shop = this.navParams.get('shopSelect');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemPage');
  }
  addCart(item){
    this.navCtrl.push(CartPage,{item:Item});
  }
}
