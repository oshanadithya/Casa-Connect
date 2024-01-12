import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AlertController, LoadingController, isPlatform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';

@Component({
  selector: 'app-ic-t',
  templateUrl: './ic-t.page.html',
  styleUrls: ['./ic-t.page.scss'],
})
export class IcTPage implements OnInit {
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
  ictid: any;
  appleid: any;
  gmailid: any;
  member_contacts: any = [];

  constructor(private auth: Auth, private storage: Storage, public _apiService: ApiService, private loadingController: LoadingController, private router: Router, public http: HttpClient) { }

  async ngOnInit() {
    const loading = await this.loadingController.create();
    await loading.present();
    await this.storage.create();
    this.ictid = await this.storage.get('ictid');
    this.setIC();
    this.getICT();
    await loading.dismiss();
  }

  setIC() {
    // console.log("member id", this.asid);
    this.http
      .post('https://casa.evokemusic.net/api/inland_container_terminals_contact_by_id', {
        id: this.ictid
      })
      .subscribe((response) => {
        // console.log("id :", this.ictid)
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

  getICT() {
    const url = 'https://casa.evokemusic.net/api/inland_container_terminals_contacts/';
      const f_url = `${url}${this.ictid}`
      this.http.get(f_url).subscribe((res:any) => {
        this.member_contacts = res;
        console.log("Member contacts", this.member_contacts);
      },(error:any) => {
        console.log("Error", error);
      });
  }

}