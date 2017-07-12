import { UsuarioService } from './../../domain/usuario/usuario-service';
import { ShopService } from './../../providers/shop-service';
import { Shop } from './../../domain/store/shop';
import { ShopRegistrationPage } from './../shop-registration/shop-registration';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemRegistrationPage } from '../item-registration/item-registration';
/*
  Generated class for the UserShop page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-shop',
  templateUrl: 'user-shop.html'
})
export class UserShopPage {

  public shops: Shop[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public shopService: ShopService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserShopPage');
  }
  ngOnInit() {
    //this.initLoader();

    this.shopService.getAllShops().then((result) => {
      //this.loading.dismiss();
      this.shops = result;
      //console.log(this.shops);
    }, (err) => {
      //this.loading.dismiss();
      //this.presentToast(err);
    });
  }

  addShop(){
    this.navCtrl.push(ShopRegistrationPage)
    this.shopService.getAllShops().then((result) =>{
      this.shops = result;
    });
  }

  selectStore(shop){
    this.navCtrl.push(ItemRegistrationPage, { shopSelect: shop } );
  }

}
