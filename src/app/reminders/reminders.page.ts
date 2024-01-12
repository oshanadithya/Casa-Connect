import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { AlertController, LoadingController, isPlatform } from '@ionic/angular';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.page.html',
  styleUrls: ['./reminders.page.scss'],
})
export class RemindersPage implements OnInit {

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
  gmailid: any;
  appleid: any;
  member: any;
  useremail: any;
  google_email: any;
  apple_email: any;

  constructor(private auth: Auth, private route: ActivatedRoute, private alertController: AlertController, private router: Router, public _apiService: ApiService, public http: HttpClient, private storage: Storage, private loadingController: LoadingController) {
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
    this.getReminder();
    await loading.dismiss();
  }

  async showAlert(header: any, message: any) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Okay'],
    });
    await alert.present();
  }

  /* getReminder() {
    const url = 'https://casa.evokemusic.net/api/v2/getreminder/';
    const f_url = `${url}${this.user_id}`
    this.http.get(f_url).subscribe((res:any) => {
      this.user_events = res;
      console.log("Reminders", this.user_events);
    },(error:any) => {
      console.log("Error", error);
    });
    this.router.navigateByUrl('reminders');
  } */

  async getReminder() {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const httpOptions = {
      headers: new HttpHeaders ({
        'Content-Type' : 'application/json'
      })
    };
    const url = 'https://casa.evokemusic.net/api/v2/getreminder/';
    if(this.google_email) {
      const f_url = `${url}${this.gmailid}`;
      this.http.get(f_url, httpOptions)
        .subscribe({
          next: (res) => {
            this.user_events = res;
            // console.log("Reminders", this.user_events);
          },
          error: error => console.error(error),
          complete: () => console.log('Complete')
        });
    }
    else {
      const f_url = `${url}${this.auth.currentUser?.uid}`;
      this.http.get(f_url, httpOptions)
        .subscribe({
          next: (res) => {
            this.user_events = res;
            // console.log("Reminders", this.user_events);
          },
          error: error => console.error(error),
          complete: () => console.log('Complete')
        });
    }
  }

  deleteReminder(id: any) {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const httpOptions = {
      headers: new HttpHeaders ({
        'Content-Type' : 'application/json'
      })
    };
    const url = 'https://casa.evokemusic.net/api/v2/removereminder';
    if(this.google_email) {
      const options = {
        user_id: this.gmailid,
        event_id: id
      }
      this.http.post(url, options, httpOptions)
        .subscribe({
          next: (res) => {
            // console.log('Remove reminder api result', res);
            this.addReminder = res;
            this.showAlert('Reminder Deleted', 'Successfully!');
          },
          error: error => console.error(error),
          complete: () => console.log('Complete')
        });
    }
    else if(this.apple_email){
      const options = {
        user_id: this.appleid,
        event_id: id
      }
      this.http.post(url, options, httpOptions)
        .subscribe({
          next: (res) => {
            // console.log('Remove reminder api result', res);
            this.addReminder = res;
            this.showAlert('Reminder Deleted', 'Successfully!');
          },
          error: error => console.error(error),
          complete: () => console.log('Complete')
        });
    }
    else {
      const options = {
      user_id: this.user_id,
      event_id: id
    }
    this.http.post(url, options, httpOptions)
      .subscribe({
        next: (res) => {
          // console.log('Remove reminder api result', res);
          this.addReminder = res;
          this.showAlert('Reminder Deleted', 'Successfully!');
        },
        error: error => console.error(error),
        complete: () => console.log('Complete')
      });
    }
    
  }

  goBack() {
    this.router.navigateByUrl('menu/events');
  }

  doRefresh(event : any) {  
    // console.log('Pull Event Triggered!');
    setTimeout(() => {  
      this.getReminder();
      event.target.complete();  
    }, 2000);  
  }

}