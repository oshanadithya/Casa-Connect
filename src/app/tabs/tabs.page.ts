import { Component, OnInit } from '@angular/core';
// import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { ActivatedRoute, Router } from '@angular/router';
// import { Http } from '@capacitor-community/http';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  user: any;

  constructor(private route: ActivatedRoute, private router: Router) { 
  }

  ngOnInit() {}

}
