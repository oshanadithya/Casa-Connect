import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AlertController, LoadingController, isPlatform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {
  directory: any = [];
  id: any = [];
  org: any = [];
  pNumber: any = [];
  tid: any;
  company_name: any = "";
  address_1: any;
  address_2: any;
  city: any;
  telephone: any;
  fax: any;
  email_1: any;
  email_2: any;
  appleid: any;
  gmailid: any;
  member_contacts: any = [];

  constructor(private auth: Auth, private storage: Storage, public _apiService: ApiService, private loadingController: LoadingController, private router: Router, public http: HttpClient) { 
    // this.setDirectory();
  }

  async ngOnInit() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.tid = await this.storage.get('memberid');
    this.appleid = await this.storage.get('appleid');
    this.gmailid = await this.storage.get('gmailid');
    this.setDirectory();
    this.getMemberContacts();
    await loading.dismiss();
  }

  setDirectory() {
    // console.log("member id", this.tid);
    this.http
      .post('https://casa.evokemusic.net/api/member_by_id', {
        id: this.tid
      })
      .subscribe((response) => {
        // console.log('getbyid res', response);
        this.org = response;
        console.log("Org :", this.org);
        this.pNumber = this.org.telephone;
      });
  }

  async back() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.router.navigateByUrl('menu/directory');
    await loading.dismiss();
  }

  getMemberContacts() {
    const url = 'https://casa.evokemusic.net/api/member_contacts/';
      const f_url = `${url}${this.tid}`
      this.http.get(f_url).subscribe((res:any) => {
        this.member_contacts = res;
        console.log("Member contacts", this.member_contacts);
      },(error:any) => {
        console.log("Error", error);
      });
  }

}