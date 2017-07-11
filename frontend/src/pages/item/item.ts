import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Shop } from '../../domain/store/shop';

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
  

  constructor(public navParams: NavParams, public navCtrl: NavController) {
    //this.shop = this.navParams.get('shopSelect');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemPage');
  }

}
