import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AlertController, LoadingController, isPlatform } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.page.html',
  styleUrls: ['./exchange-rates.page.scss'],
})
export class ExchangeRatesPage implements OnInit {

  rates: any = [];

  constructor(private router: Router, public _apiService: ApiService) { }

  ngOnInit() {
    this.getRates();
  }

  getRates() {
    this._apiService.getExchangerates().subscribe((res:any) => {
      this.rates = res;
      console.log("Rates :", this.rates);
    },(error:any) => {
      console.log("Error", error);
    })
  }

  setClose() {
    this.router.navigateByUrl('menu/home');
  }

}
