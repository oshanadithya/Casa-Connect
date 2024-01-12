import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, isPlatform } from '@ionic/angular';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { Storage } from '@ionic/storage-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userid: any;
  useremail: any;
  userDetails: any = [];
  isModalOpen = false;
  isModalOpen2 = false;
  verificationDetails!: FormGroup;
  verificationDetails2!: FormGroup;
  google_email: any;
  apple_email: any;
  gmailid: any;
  user_id: any;
  appleid: any;
  verId: any;
  verificationStatus: any;
  verifiedUserDetails: any = [];
  profile: any;

  constructor(private alertController: AlertController, private fb: FormBuilder, private router: Router, private loadingController: LoadingController, private auth: Auth, private storage: Storage, public http: HttpClient) {}

  async ngOnInit() {

    this.useremail = await this.storage.get('email');
    this.google_email = await this.storage.get('google_email');
    this.apple_email = await this.storage.get('apple_email');
    this.user_id = await this.storage.get('userid');
    this.appleid = await this.storage.get('appleid');
    this.gmailid = await this.storage.get('gmailid');
    this.verId = await this.storage.get('verId');

    this.getUserdetails();
    this.userVerification();
    this.getVerifiedUser();
    
    this.verificationDetails = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      tele: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern("[0-9 ]{9}")]],
      company: ['', [Validators.required]]
    });
    
    //edit profile GET request
    if(this.appleid) {
      const url = 'https://casa.evokemusic.net/api/v1/profile/';
      const f_url = `${url}${this.appleid}`
      this.http.get(f_url).subscribe((res:any) => {
        this.profile = res;
        console.log("edit profile GET request status", this.profile);
        this.verificationDetails2 = this.fb.group({
          email2: { value: res.email, disabled: true },
          name2: { value: res.name, disabled: true },
          tele2: { value: res.telephone, disabled: false },
          company2: { value: res.company, disabled: true }
        });
      },(error:any) => {
        console.log("Error", error);
      });
    }
    else if(this.gmailid) {
      const url = 'https://casa.evokemusic.net/api/v1/profile/';
      const f_url = `${url}${this.gmailid}`
      this.http.get(f_url).subscribe((res:any) => {
        this.profile = res;
        console.log("edit profile GET request status", this.profile);
        this.verificationDetails2 = this.fb.group({
          email2: { value: res.email, disabled: true },
          name2: { value: res.name, disabled: true },
          tele2: { value: res.telephone, disabled: false },
          company2: { value: res.company, disabled: true }
        });
      },(error:any) => {
        console.log("Error", error);
      });
    }
    else {
      const url = 'https://casa.evokemusic.net/api/v1/profile/';
      const f_url = `${url}${this.auth.currentUser?.uid}`
      this.http.get(f_url).subscribe((res:any) => {
        this.profile = res;
        console.log("edit profile GET request status", this.profile);
        this.verificationDetails2 = this.fb.group({
          email2: { value: res.email, disabled: true },
          name2: { value: res.name, disabled: true },
          tele2: { value: res.telephone, disabled: false },
          company2: { value: res.company, disabled: true }
        });
      },(error:any) => {
        console.log("Error", error);
      });
    }
    
  }

  get email() {
    return this.verificationDetails?.get('email');
  }

  get name() {
    return this.verificationDetails?.get('name');
  }

  get tele() {
    return this.verificationDetails?.get('tele');
  }

  get tele2() {
    return this.verificationDetails2?.get('tele2');
  }

  get company() {
    return this.verificationDetails?.get('company');
  }

  async showAlert(header: any, message: any) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Okay'],
    });
    await alert.present();
  }

  getUserdetails() {
    if(this.useremail) {
      this.userid = this.auth.currentUser?.uid;
      this.useremail = this.auth.currentUser?.email;
      this.userDetails = this.auth.currentUser;
    }
    else {
      console.log("Google email rec");
    }
  }

  async back() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.router.navigateByUrl('menu/home');
    await loading.dismiss();
  }
  
  setOpen(testId: any) {
    if(testId == false) {
      this.isModalOpen = testId;
    }
    else {
      this.isModalOpen = testId;
    }
  }

  setOpen2(testId: any) {
    if(testId == false) {
      this.isModalOpen2 = testId;
    }
    else {
      this.isModalOpen2 = testId;
    }
  }

  async next() {
    this.isModalOpen = false;
    const loading = await this.loadingController.create();
    await loading.present();
    if(this.useremail) {
      console.log("CASA Email");
      console.log("uid :", this.auth.currentUser?.uid);
      this.http
      .post('https://casa.evokemusic.net/api/casa_member_req', {
        uuid: this.auth.currentUser?.uid,
        name: this.verificationDetails.value.name,
        email: this.verificationDetails.value.email,
        company: this.verificationDetails.value.company,
        telephone: this.verificationDetails.value.tele
      })
      .subscribe(async(response) => {
        console.log("Response :", response);
        this.showAlert('', 'OTP has sent to the given email!');
        this.router.navigateByUrl('otp-pg');
        await loading.dismiss();
      });
    
    }
    else if(this.google_email) {
      try{
        console.log("Google Email");
        console.log("uid :", this.gmailid);
        this.http
        .post('https://casa.evokemusic.net/api/casa_member_req', {
          uuid: this.gmailid,
          name: this.verificationDetails.value.name,
          email: this.verificationDetails.value.email,
          company: this.verificationDetails.value.company,
          telephone: this.verificationDetails.value.tele
        })
        .subscribe(async (response) => {
          console.log("Response :", response);
          this.showAlert('', 'OTP has sent to the given email!');
          this.router.navigateByUrl('otp-pg');
          await loading.dismiss();
        });
      
      }
      catch (e) {
        console.log(e);
      }
    }
    else {
      this.http
      .post('https://casa.evokemusic.net/api/casa_member_req', {
        uuid: this.appleid,
        name: this.verificationDetails.value.name,
        email: this.verificationDetails.value.email,
        company: this.verificationDetails.value.company,
        telephone: this.verificationDetails.value.tele
      })
      .subscribe(async(response) => {
        console.log("Response :", response);
        this.showAlert('', 'OTP has sent to the given email!');
        this.router.navigateByUrl('otp-pg');
        await loading.dismiss();
      });
    await loading.dismiss();
    }
  }

  userVerification() {

    if(this.useremail) {
      this.http
      .post('https://casa.evokemusic.net/api/v1/verification', {
        user_id: this.auth.currentUser?.uid
      })
      .subscribe((response) => {
        // console.log("userid :", this.userid);
        console.log("status :", response);
        this.verificationStatus = response;
      });
    }
    else if (this.gmailid){
      this.http
      .post('https://casa.evokemusic.net/api/v1/verification', {
        user_id: this.gmailid
      })
      .subscribe((response) => {
        // console.log("gmailid :", response);
        console.log("status :", response);
        this.verificationStatus = response;
      });
    }
    else {
      this.http
      .post('https://casa.evokemusic.net/api/v1/verification', {
        user_id: this.appleid
      })
      .subscribe((response) => {
        // console.log("appleid :", response);
        console.log("status :", response);
        this.verificationStatus = response;
      });
    }
    
  }

  getVerifiedUser() {

    const url = 'https://casa.evokemusic.net/api/v1/profile/';
    if(this.useremail) {
      const f_url = `${url}${this.auth.currentUser?.uid}`
      this.http.get(f_url).subscribe((res:any) => {
        this.verifiedUserDetails = res;
        // console.log("Verified Users", this.verifiedUserDetails);
      },(error:any) => {
        console.log("Error", error);
      });
    }
    else if(this.gmailid) {
      const f_url = `${url}${this.gmailid}`
      this.http.get(f_url).subscribe((res:any) => {
        this.verifiedUserDetails = res;
        // console.log("Verified Users", this.verifiedUserDetails);
      },(error:any) => {
        console.log("Error", error);
      });
    }
    else {
      const f_url = `${url}${this.appleid}`
      this.http.get(f_url).subscribe((res:any) => {
        this.verifiedUserDetails = res;
        console.log("Verified Users", this.verifiedUserDetails);
      },(error:any) => {
        console.log("Error", error);
      });
    }
      
  }

  updateOnSubmit() {
    //edit profile POST request
    if(this.verificationDetails.valid) {
      if(this.gmailid) {
        this.http
        .post('https://casa.evokemusic.net/api/v1/edit_profile', {
          user_id: this.gmailid,
          // name: this.verificationDetails2.value.name2,
          // image: this.verificationDetails2.value.image2,
          // email: this.verificationDetails2.value.email2,
          mobile_number: this.verificationDetails2.value.tele2
          // company_name: this.verificationDetails2.value.company2
        })
        .subscribe((response) => {
          // this.org = response;
          this.setOpen2(false);
          this.router.navigateByUrl('menu/home');
          this.showAlert('', 'Member Edited Successfull');
          console.log('company name',this.verificationDetails2.value.company2);
          console.log("Edit profile Status :", response);
        });
      }
      else if(this.appleid) {
        this.http
        .post('https://casa.evokemusic.net/api/v1/edit_profile', {
          user_id: this.appleid,
          // name: this.verificationDetails2.value.name2,
          // image: this.verificationDetails2.value.image2,
          // email: this.verificationDetails2.value.email2,
          mobile_number: this.verificationDetails2.value.tele2
          // company_name: this.verificationDetails2.value.company2
        })
        .subscribe((response) => {
          // this.org = response;
          this.setOpen2(false);
          this.router.navigateByUrl('menu/home');
          this.showAlert('', 'Member Edited Successfull');
          console.log("Edit profile Status :", response);
        });
      }
      else {
        this.http
        .post('https://casa.evokemusic.net/api/v1/edit_profile', {
          user_id: this.auth.currentUser?.uid,
          // name: this.verificationDetails2.value.name2,
          // image: this.verificationDetails2.value.image2,
          // email: this.verificationDetails2.value.email2,
          mobile_number: this.verificationDetails2.value.tele2
          // company_name: this.verificationDetails2.value.company2
        })
        .subscribe((response) => {
          this.setOpen2(false);
          this.router.navigateByUrl('menu/home');
          this.showAlert('', 'Member Edited Successfull');
          console.log("Edit profile Status :", response);
        });
      }
    }
    
  }

  asteriskValidator() {
    return (control) => {
      const isValid = /\*$/.test(control.value);
      return isValid ? null : { invalidAsterisk: true };
    };
  }

}