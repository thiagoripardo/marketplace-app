import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Item } from '../../domain/store/item';

/*
  Generated class for the Cart page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})
export class CartPage {
  items: Item[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) { 
  
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  
}

  buyItems(){}
    //console.log('done');
}
