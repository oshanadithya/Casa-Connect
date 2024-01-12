import { Component, OnInit } from '@angular/core';
// import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { ActivatedRoute, Router } from '@angular/router';
// import { Http } from '@capacitor-community/http';

@Component({
  selector: 'app-community',
  templateUrl: './community.page.html',
  styleUrls: ['./community.page.scss'],
})
export class CommunityPage implements OnInit {

  user: any;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
  }

}
