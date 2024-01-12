import { Component, OnInit } from '@angular/core';
//import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { ActivatedRoute, Router } from '@angular/router';
//import { Http } from '@capacitor-community/http';
import { ApiService } from '../api.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AlertController, LoadingController, isPlatform } from '@ionic/angular';
import { Optional } from '@angular/core';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  id: any;
  user: any;
  headline: any;
  synopsys: any;
  image: any;
  image_tagline: any;
  status: any;
  attachment: any;
  link: any;
  news: any = [];
  images: any = [];
  isModalOpen = false;
  newDesc: any = [];
  artical: any;
  username: any;
  savedNews: any = [];
  val: boolean = true;
  val2: boolean = true;
  downloadNews: any;
  member: any
  testVal: any = 0;

  constructor(private alertController: AlertController, private route: ActivatedRoute, private router: Router, public _apiService: ApiService, public http: HttpClient,
    private platform: Platform, @Optional() private routerOutlet?: IonRouterOutlet, private storage?: Storage,
    ) {
    this.getNews();
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet?.canGoBack()) {
        App.exitApp();
      }
    });
  }

  async ngOnInit(){
    await this.storage?.create();
    this.member = await this.storage?.get('userState');
    // this.attachment = await this.storage?.get('attachment');
    // console.log("Attachment", this.attachment);
    // this.testFunction();
  }

  async showAlert(header: any, message: any) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Okay'],
    });
    await alert.present();
  }

  getNews() {
    this._apiService.getNews().subscribe((res:any) => {
      // console.log("Success", res);
      this.news = res;
      //this.image = res.image;
    },(error:any) => {
      // console.log("Error", error);
    })
  }

  setOpen(testId: any) {
    if(testId != false) {
      this.isModalOpen = true;
      // console.log('News ID', testId);
      this.http
      .post('https://casa.evokemusic.net/api/news_by_id', {
        id: testId
      })
      .subscribe((response) => {
        this.newDesc = response;
        // console.log('getbyid res', this.newDesc);
        this.downloadNews = testId;
        // console.log("news id :", this.downloadNews);
        if(this.newDesc.attachment != null) {
          // this.storage?.set("attachment", this.newDesc.attachment);
          // console.log("storingAttachment :", this.newDesc.attachment);
          if(this.newDesc.attachment != null) {
            this.val = false;
            this.val2 = true;
            // console.log("storedAttachment :", this.attachment);
          }
          else if(this.newDesc.attachment == null) {
            this.val = true;
            this.val2 = true;
          }
        }
        else {

          if(this.newDesc.link != null) {
            this.val2 = false;
            this.val = true;
            // this.storage?.remove("attachment");
          }
          else if(this.newDesc.link == null) {
            this.val2 = true;
            this.val = true;
          }
        }
      });
    }
    else {
      this.isModalOpen = false;
    }
  }

  doRefresh(event : any) {  
    // console.log('Pull Event Triggered!');
    setTimeout(() => {  
      this.getNews();
      event.target.complete();  
    }, 2000);  
  }

  // testFunction() {
  //   this.testVal = 10;
  //   this.testVal /= 2;
  //   ++this.testVal;
  //   console.log(this.testVal);
  // }
  
}