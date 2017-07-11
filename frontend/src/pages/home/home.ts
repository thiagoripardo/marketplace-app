import { Component } from '@angular/core';
import { AuthService } from '../../providers/auth-service';
import { ShopService } from '../../providers/shop-service';
import { NavController, App, MenuController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Shop } from '../../domain/store/shop';
import { ShopPage } from '../shop/shop';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loading: any;
  isLoggedIn: boolean = false;
  public shops : Shop[] = [];
  public shp;
  constructor(public app: App, 
    public navCtrl: NavController, 
    public authService: AuthService, 
    public loadingCtrl: LoadingController, 
    private toastCtrl: ToastController,
    private _alertCtrl: AlertController,
    public shopService: ShopService,
    public menu: MenuController) {
      if(localStorage.getItem("token")) {
        this.isLoggedIn = true;
      }
      menu.enable(true);
  }

  ngOnInit() {
    this.initLoader();

    this.shopService.getAllShops().then((result) => {
      this.loading.dismiss();
      this.shops = result;
      //console.log(this.shops);
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    });
  }

  logout() {
    this.logoutLoader();
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);
    this.loading.dismiss();
  }
  
  getinfo() {
    this.showLoader();
    this.authService.getinfo().then((result) => {
      this.loading.dismiss();
      //console.log(result);

      this._alertCtrl.create({
              title: 'Envio',
              subTitle: JSON.stringify(result),
              buttons: [{ text: 'Ok'}]
            }).present()

      this.presentToast(result);
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    });
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Authenticating...'
    });

    this.loading.present();
  }

  initLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Authenticating...'
    });

    this.loading.present();
  }

  logoutLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Logout...'
    });

    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  selectStore(shop){
    this.navCtrl.push(ShopPage, { shopSelect: shop } );
  }

}