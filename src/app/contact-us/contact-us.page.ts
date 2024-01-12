import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, PopoverController, isPlatform } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {

  constructor(private loadingController: LoadingController, private router: Router) { }

  ngOnInit() {
  }

  async back() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.router.navigateByUrl('menu/home');
    await loading.dismiss();
  }

}
