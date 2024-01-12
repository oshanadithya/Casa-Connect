import { Injectable } from '@angular/core';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { Router } from '@angular/router'
import {isPlatform} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(private router: Router) { }

  public initPush() {
    // if (!isPlatform('capacitor')) {
    // }
    this.registerPush();
  }

  private registerPush() {
    console.log('Initializing service');
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    PushNotifications.addListener('registration',
      (token: Token) => {
        // alert('Push registration success, token: ' + token.value);
        console.log('Push registration success, token: ', token.value);
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        // alert('Error on registration: ' + JSON.stringify(error));
        console.log('Error on registration: ', JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      async (notification: PushNotificationSchema) => {
        // alert('Push received: ' + JSON.stringify(notification));
        console.log('Push received: ', JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      async (notification: ActionPerformed) => {
        // alert('Push action performed: ' + JSON.stringify(notification));
        const data = notification.notification.data;
        console.log('Push action performed: ', JSON.stringify(notification));
        // if(data.detailsId) {
        //   this.router.navigateByUrl(`menu/home/${data.detailsId}`);
        // }
      }
    );
  }

}
