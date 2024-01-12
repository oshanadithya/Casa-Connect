import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AlertController, LoadingController, isPlatform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-classification-societies',
  templateUrl: './classification-societies.page.html',
  styleUrls: ['./classification-societies.page.scss'],
})
export class ClassificationSocietiesPage implements OnInit {
  directory: any = [];
  id: any = [];
  org: any = [];
  pNumber: any = [];
  tid: any;
  company_name: any;
  address_1: any;
  address_2: any;
  city: any;
  telephone: any;
  fax: any;
  email_1: any;
  email_2: any;
  csid: any;
  member_contacts: any = [];

  constructor(private storage: Storage, public _apiService: ApiService, private loadingController: LoadingController, private router: Router, public http: HttpClient) { }

  async ngOnInit() {
    const loading = await this.loadingController.create();
    await loading.present();
    await this.storage.create();
    this.csid = await this.storage.get('csid');
    this.setCS();
    this.getCS();
    await loading.dismiss();
  }

  setCS() {
    // console.log("member id", this.asid);
    this.http
      .post('https://casa.evokemusic.net/api/classification_societies_contact_by_id', {
        id: this.csid
      })
      .subscribe((response) => {
        // console.log('getbyid res', response);
        this.org = response;
        // console.log("Org :", this.org);
        this.pNumber = this.org.telephone;
      });
  }

  async back() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.router.navigateByUrl('menu/directory');
    await loading.dismiss();
  }

  getCS() {
    const url = 'https://casa.evokemusic.net/api/classification_societies_contacts/';
      const f_url = `${url}${this.csid}`
      this.http.get(f_url).subscribe((res:any) => {
        this.member_contacts = res;
        console.log("Member contacts", this.member_contacts);
      },(error:any) => {
        console.log("Error", error);
      });
  }

}
