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
  count: number = 0;
  totalPedido: number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.items[this.count] = navParams.get('item');
    this.count = this.count++;
    this.calcTotalPedido(navParams.get('item')); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }
  calcTotalPedido(item){
      this.totalPedido = this.totalPedido + item.price;
    }
  }
