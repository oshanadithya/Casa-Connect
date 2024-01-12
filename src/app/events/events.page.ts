import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { AlertController, LoadingController, isPlatform } from '@ionic/angular';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { Console } from 'console';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  user: any;
  events: any = [];
  event_name: any;
  description: string | undefined;
  image: any;
  seat_count: any;
  bookings: any;
  status: any;
  date: any;
  start_time: any;
  venue: any;
  user_id: any;
  event_id: any;
  isModalOpen = false;
  user_events: any = [];
  addReminder: any;
  removeReminder: any;
  btnStatus: any = 0;
  status_in_calander: any = 1;
  appleid: any;
  gmailid: any;
  member: any;
  useremail: any;
  google_email: any;
  apple_email: any;

  constructor( private auth: Auth, private route: ActivatedRoute, private alertController: AlertController, private router: Router, public _apiService: ApiService, public http: HttpClient, private storage: Storage, private loadingController: LoadingController) {
  }

  async showAlert(header: any, message: any) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Okay'],
    });
    await alert.present();
  }

  async ngOnInit() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.user_id = await this.storage.get('userid');
    this.member = await this.storage.get('userState');
    this.useremail = await this.storage.get('email');
    this.google_email = await this.storage.get('google_email');
    this.apple_email = await this.storage.get('apple_email');
    this.appleid = await this.storage.get('appleid');
    this.gmailid = await this.storage.get('gmailid');
    this.sendPostRequest();
    await loading.dismiss();
  }

  /* async getEv() {
    const loading = await this.loadingController.create();
    await loading.present();
    const url = 'https://casa.evokemusic.net/api/v2/events/';
    const f_url = `${url}${this.user_id}`;
    this.http.get(f_url).subscribe((res:any) => {
      this.events = res;
      // console.log("Events", this.events);
      console.log("User id", this.user_id);
    }),
      (error: any) => {
        console.error("Error", error);
      };
      this.router.navigateByUrl('menu/events');
      await loading.dismiss();
  } */

  /* remind(id: any) {
      console.log('Event Id', id);
      this.http
      .post('https://casa.evokemusic.net/api/v2/addreminder', {
        user_id: this.user_id,
        event_id: id
      })
      .subscribe((response) => {
        console.log('Add reminder api result', response);
        this.addReminder = response;
        this.showAlert('Reminder Added', 'Successfull!');
        this.gotoReminders();
      },(error:any) => {
        console.log("Error", error);
      });
      this.event_id = id;
  }; */

  remind(id: any) {
      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      const httpOptions = {
        headers: new HttpHeaders ({
          'Content-Type' : 'application/json'
        })
      };
      const url = this._apiService.apiV2 + 'addreminder';
      if(this.google_email) {
        const options = {
          'user_id': this.gmailid,
          'event_id': id
        }
        this.http.post(url, JSON.stringify(options), httpOptions)
        .subscribe({
          next: (res: any) => {
            this.addReminder = res;
          },
          error: error => console.error(error),
          complete: () => {
            this.showAlert('Reminder Added', 'Successfully!');
            this.gotoReminders();
          }
        });
      }
      else if(this.apple_email) {
        const options = {
          'user_id': this.appleid,
          'event_id': id
        }
        // console.log("email det", this.user_id, id);
        this.http.post(url, JSON.stringify(options), httpOptions)
        .subscribe({
          next: (res: any) => {
            // console.log('Add reminder api result', res);
            this.addReminder = res;
          },
          error: error => console.error(error),
          complete: () => {
            this.showAlert('Reminder Added', 'Successfully!');
            this.gotoReminders();
          }
        });
      }
      else {
        const options = {
          'user_id': this.auth.currentUser?.uid,
          'event_id': id
        }
        // console.log("email det", this.user_id, id);
        this.http.post(url, JSON.stringify(options), httpOptions)
        .subscribe({
          next: (res: any) => {
            // console.log('Add reminder api result', res);
            this.addReminder = res;
          },
          error: error => console.error(error),
          complete: () => {
            this.showAlert('Reminder Added', 'Successfully!');
            this.gotoReminders();
          }
        });
      }
  }

  gotoReminders() {
    this.router.navigateByUrl('reminders');
  }

  async sendPostRequest() {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const httpOptions = {
      headers: new HttpHeaders ({
        'Content-Type' : 'application/json'
      })
    }
    const url = 'https://casa.evokemusic.net/api/v2/events/';
    if(this.google_email) {
      const f_url = `${url}${this.gmailid}`;
      this.http.get(f_url, httpOptions)
        .subscribe({
          next: (res) => {
            this.events = res;
            // console.log("Events", this.events);
            // console.log("User id", this.gmailid);
          },
          error: error => console.error(error),
          complete: () => console.log()
        });
    }
    else if(this.apple_email) {
      const f_url = `${url}${this.appleid}`;
      this.http.get(f_url, httpOptions)
        .subscribe({
          next: (res) => {
            this.events = res;
            // console.log("Events", this.events);
            // console.log("User id", this.appleid);
          },
          error: error => console.error(error),
          complete: () => console.log()
        });
    }
    else {
      const f_url = `${url}${this.auth.currentUser?.uid}`;
      this.http.get(f_url, httpOptions)
        .subscribe({
          next: (res) => {
            this.events = res;
            // console.log("Events", this.events);
            // console.log("User id", this.auth.currentUser?.uid);
          },
          error: error => console.error(error),
          complete: () => console.log()
        });
    }
    
  }

  doRefresh(event : any) {  
    // console.log('Pull Event Triggered!');
    setTimeout(() => {  
      this.sendPostRequest();
      event.target.complete();  
    }, 2000);  
  }  
}