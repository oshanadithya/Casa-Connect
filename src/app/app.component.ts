import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HomePage } from './home/home.page';
import { SplashScreen } from '@capacitor/splash-screen';
import {GoogleAuth} from "@codetrix-studio/capacitor-google-auth";
import {isPlatform} from '@ionic/angular';
import { FcmService } from './services/fcm.service';

export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}

@Component({
  
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})


export class AppComponent implements OnInit{
  appMenuItemsMyAccount: Array<MenuItem>;
  pages: Array<{ title: string, component: any }>;
  base64Image: any;
  userName:any;
  email:any;
  username: any;

  constructor(
    private router: Router,
    //private storage: Storage
    private fcmService: FcmService
  ) {

    if (!isPlatform('capacitor')) {
      GoogleAuth.initialize();
    }

    //this.base64Image = 'assets/imgs/avator.png';
    this.pages = [
      {title: 'Home', component: HomePage},
    ];

    this.appMenuItemsMyAccount = [
      {title: 'Home', component: 'tabs/home', icon: 'home'},
      {title: 'My Profile', component: 'profile', icon: 'briefcase'},
    ];

    this.initializeApp();

  }

  initializeApp() {
    this.fcmService.initPush();
  }

  async ngOnInit() {
    await SplashScreen.hide();
  }

  public async openPage(page: any) {
    await SplashScreen.show({
      showDuration: 2000,
      autoHide: true,
    });
    
    // console.log(page)
    if (page.title == 'My Profile') {
      await this.router.navigate([page.component])
    }
  }

}
