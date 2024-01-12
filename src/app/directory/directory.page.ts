import { Component, Injectable, OnInit, ViewChild, NgZone, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AlertController, LoadingController, isPlatform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.page.html',
  styleUrls: ['./directory.page.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DirectoryPage implements OnInit, OnChanges {

  user: any;
  public directory: any = [];
  associateMembers: any = [];
  governmentAssociations: any = [];
  tradeAssociations: any = [];
  shipRepairers: any = [];
  bunkerLubricantSup: any = [];
  academicInstitutuions: any = [];
  org: any = [];
  shipSuppliers: any = [];
  insurenceCompanies: any = [];
  classificationSocieties: any = [];
  piCLubs: any = [];
  iCT: any = [];
  maritimeLawyers: any = [];
  id: any;
  memberById: any;
  company_name: any;
  address_1: any;
  address_2: any;
  city: any;
  telephone: any;
  fax: any;
  email_1: any;
  email_2: any;
  logo: any;
  profile_status: any;
  message: any;
  isModalOpen = false;
  pNumber: any;
  value: any = "M";
  tid: any;
  asid: any;
  compname: any = [];
  searchTerm!: string;
  public results: any = [];
  resultAM: any = [];
  resultGI: any = [];
  resultTA: any = [];
  resultSR: any = [];
  resultBL: any = [];
  resultAI: any = [];
  resultSS: any = [];
  resultIC: any = [];
  resultCS: any = [];
  resultPIC: any = [];
  resultICT: any = [];
  resultML: any = [];
  event: any;

  //constructors
  constructor(private cdr: ChangeDetectorRef, private zone: NgZone, private storage: Storage, private route: ActivatedRoute, private router: Router, public _apiService: ApiService, public http: HttpClient, private loadingController: LoadingController) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log("ngOnchanges Called");
    // console.log(changes);
  }

  ngOnInit() {
    // console.log("ngOnInit Called");
    this.getDirectory();
    this.getAssociateMembers();
    this.getGovernmentInstitutions();
    this.getTradeAssociations();
    this.getShipRepairers();
    this.getBunkerLubricantSup();
    this.getAcademicInstitutions();
    this.getShipSuppliers();
    this.getInsurenceCompanies();
    this.getClassificationSocieties();
    this.getPIClubs();
    this.getICT();
    this.getMaritimeLawyers();
    this.cdr.detectChanges();
  }

  getDirectory() {
    this._apiService.getDirectory().subscribe(
      (res:any) => {
      this.directory = res;
      this.results = this.directory.map((item: any) => item);
      // console.log("Directory :", this.directory);
    },(error:any) => {
      console.log("Error", error);
    })
  }

  type(val: any) {
    this.value = val;
  }

  getAssociateMembers() {
    this._apiService.getAssociateMembers().subscribe((res:any) => {
      this.associateMembers = res;
      this.resultAM = this.associateMembers.map((item: any) => item);
    },(error:any) => {
      console.log("Error", error);
    })
  }

  getGovernmentInstitutions() {
    this._apiService.getGovernmentInstitutions().subscribe((res:any) => {
      this.governmentAssociations = res;
      this.resultGI = this.governmentAssociations.map((item: any) => item);
    },(error:any) => {
      console.log("Error", error);
    })
  }

  getTradeAssociations() {
    this._apiService.getTradeAssociations().subscribe((res:any) => {
      this.tradeAssociations = res;
      this.resultTA = this.tradeAssociations.map((item: any) => item);
    },(error:any) => {
      console.log("Error", error);
    })
  }

  getShipRepairers() {
    this._apiService.getShipRepairers().subscribe((res:any) => {
      this.shipRepairers = res;
      this.resultSR = this.shipRepairers.map((item: any) => item);
    },(error:any) => {
      console.log("Error", error);
    })
  }

  getBunkerLubricantSup() {
    this._apiService.getBunkerLubricantSup().subscribe((res:any) => {
      // console.log("Success", res);
      this.bunkerLubricantSup = res;
      this.resultBL = this.bunkerLubricantSup.map((item: any) => item);
    },(error:any) => {
      // console.log("Error", error);
    })
  }

  getAcademicInstitutions() {
    this._apiService.getAcademicInstitutions().subscribe((res:any) => {
      // console.log("Success", res);
      this.academicInstitutuions = res;
      this.resultAI = this.academicInstitutuions.map((item: any) => item);
    },(error:any) => {
      console.log("Error", error);
    })
  }

  getShipSuppliers() {
    this._apiService.getShipSuppliers().subscribe((res:any) => {
      // console.log("Success", res);
      this.shipSuppliers = res;
      this.resultSS = this.shipSuppliers.map((item: any) => item);
    },(error:any) => {
      // console.log("Error", error);
    })
  }

  getInsurenceCompanies() {
    this._apiService.getInsurenceCompanies().subscribe((res:any) => {
      // console.log("Success", res);
      this.insurenceCompanies = res;
      this.resultIC = this.insurenceCompanies.map((item: any) => item);
    },(error:any) => {
      console.log("Error", error);
    })
  }

  getClassificationSocieties() {
    this._apiService.getClassificationSocieties().subscribe((res:any) => {
      // console.log("Success", res);
      this.classificationSocieties = res;
      this.resultCS = this.classificationSocieties.map((item: any) => item);
    },(error:any) => {
      console.log("Error", error);
    })
  }

  getPIClubs() {
    this._apiService.getPIClubs().subscribe((res:any) => {
      // console.log("Success", res);
      this.piCLubs = res;
      this.resultPIC = this.piCLubs.map((item: any) => item);
    },(error:any) => {
      // console.log("Error", error);
    })
  }

  getICT() {
    this._apiService.getICT().subscribe((res:any) => {
      // console.log("Success", res);
      this.iCT = res;
      this.resultICT = this.iCT.map((item: any) => item);
    },(error:any) => {
      console.log("Error", error);
    })
  }

  getMaritimeLawyers() {
    this._apiService.getMaritimeLawyers().subscribe((res:any) => {
      // console.log("Success", res);
      this.maritimeLawyers = res;
      this.resultML = this.maritimeLawyers.map((item: any) => item);
    },(error:any) => {
      console.log("Error", error);
    })
  }

  async setOpen(testId: any) {
      const loading = await this.loadingController.create();
      await loading.present();
      await this.storage.set('memberid', testId);
      this.router.navigateByUrl('members');
      await loading.dismiss();
  }

  async aM(testId: any) {
      const loading = await this.loadingController.create();
      await loading.present();
      await this.storage.set('asid', testId);
      this.router.navigateByUrl('associate-member');
      await loading.dismiss();
  }

  async gI(testId: any) {
      const loading = await this.loadingController.create();
      await loading.present();
      await this.storage.set('giid', testId);
      this.router.navigateByUrl('government-institutions');
      await loading.dismiss();
  }

  async tA(testId: any) {
      const loading = await this.loadingController.create();
      await loading.present();
      await this.storage.set('taid', testId);
      this.router.navigateByUrl('trade-associations');
      await loading.dismiss();
  }

  async sR(testId: any) {
      const loading = await this.loadingController.create();
      await loading.present();
      await this.storage.set('srid', testId);
      this.router.navigateByUrl('ship-repairers');
      await loading.dismiss();
  }

  async bL(testId: any) {
      const loading = await this.loadingController.create();
      await loading.present();
      await this.storage.set('blid', testId);
      this.router.navigateByUrl('bunker-suppliers');
      await loading.dismiss();
  }

  async aI(testId: any) {
      const loading = await this.loadingController.create();
      await loading.present();
      await this.storage.set('aiid', testId);
      this.router.navigateByUrl('academic-instituitons');
      await loading.dismiss();
  }

  async sS(testId: any) {
      const loading = await this.loadingController.create();
      await loading.present();
      await this.storage.set('ssid', testId);
      this.router.navigateByUrl('ship-supliers');
      await loading.dismiss();
  }

  async iC(testId: any) {
      const loading = await this.loadingController.create();
      await loading.present();
      await this.storage.set('icid', testId);
      this.router.navigateByUrl('insurence-companies');
      await loading.dismiss();
  }

  async cS(testId: any) {
      const loading = await this.loadingController.create();
      await loading.present();
      await this.storage.set('csid', testId);
      this.router.navigateByUrl('classification-societies');
      await loading.dismiss();
  }

  async pI(testId: any) {
      const loading = await this.loadingController.create();
      await loading.present();
      await this.storage.set('piid', testId);
      this.router.navigateByUrl('pi-clubs');
      await loading.dismiss();
  }

  async icT(testId: any) {
      const loading = await this.loadingController.create();
      await loading.present();
      await this.storage.set('ictid', testId);
      // console.log("ictid :", testId);
      this.router.navigateByUrl('ic-t');
      await loading.dismiss();
  }

  async mL(testId: any) {
      const loading = await this.loadingController.create();
      await loading.present();
      await this.storage.set('mlid', testId);
      this.router.navigateByUrl('maritime-lawyers');
      await loading.dismiss();
  }

  async handleDirectory(event: any) {

    if(event.target.value) {
        const query = event.target.value.toLowerCase();
        this.directory = this.results.filter (
          (d: any) => d.company_name.toLowerCase().includes(query)
        );
    }
    else {
      // console.log(" If not event ");
      this.getDirectory();
    }

}

async handleAM(event: any) {

  if(event.target.value) {
    // console.log(" If event ");
      const query = event.target.value.toLowerCase();
      // console.log("Query :", query);
      this.associateMembers = this.resultAM.filter (
        (d: any) => d.company_name.toLowerCase().includes(query)
      );
      // console.log("Filtered Directory :", this.associateMembers);
  }
  else {
    // console.log(" If not event ");
    this.getAssociateMembers();
  }

}

async handleGI(event: any) {

  if(event.target.value) {
    // console.log(" If event ");
      const query = event.target.value.toLowerCase();
      // console.log("Query :", query);
      this.governmentAssociations = this.resultGI.filter (
        (d: any) => d.company_name.toLowerCase().includes(query)
      );
      // console.log("Filtered Directory :", this.governmentAssociations);
  }
  else {
    // console.log(" If not event ");
    this.getGovernmentInstitutions();
  }

}

async handleTA(event: any) {
  if(event.target.value) {
    // console.log(" If event ");
      const query = event.target.value.toLowerCase();
      // console.log("Query :", query);
      this.tradeAssociations = this.resultTA.filter (
        (d: any) => d.company_name.toLowerCase().includes(query)
      );
      // console.log("Filtered Directory :", this.tradeAssociations);
  }
  else {
    // console.log(" If not event ");
    this.getTradeAssociations();
  }
}

async handleSR(event: any) {
  if(event.target.value) {
    // console.log(" If event ");
      const query = event.target.value.toLowerCase();
      // console.log("Query :", query);
      this.shipRepairers = this.resultSR.filter (
        (d: any) => d.company_name.toLowerCase().includes(query)
      );
      // console.log("Filtered Directory :", this.shipRepairers);
  }
  else {
    // console.log(" If not event ");
    this.getShipRepairers();
  }
}

async handleBL(event: any) {
  if(event.target.value) {
    // console.log(" If event ");
      const query = event.target.value.toLowerCase();
      // console.log("Query :", query);
      this.bunkerLubricantSup = this.resultBL.filter (
        (d: any) => d.company_name.toLowerCase().includes(query)
      );
      // console.log("Filtered Directory :", this.bunkerLubricantSup);
  }
  else {
    // console.log(" If not event ");
    this.getBunkerLubricantSup();
  }
}

async handleAI(event: any) {
  if(event.target.value) {
    // console.log(" If event ");
      const query = event.target.value.toLowerCase();
      this.academicInstitutuions = this.resultAI.filter (
        (d: any) => d.company_name.toLowerCase().includes(query)
      );
  }
  else {
    this.getShipSuppliers();
  }
}

async handleSS(event: any) {
  if(event.target.value) {
    // console.log(" If event ");
      const query = event.target.value.toLowerCase();
      this.shipSuppliers = this.resultSS.filter (
        (d: any) => d.company_name.toLowerCase().includes(query)
      );
  }
  else {
    this.getAcademicInstitutions();
  }
}

async handleIC(event: any) {
  if(event.target.value) {
    console.log(" If event ");
      const query = event.target.value.toLowerCase();
      this.insurenceCompanies = this.resultIC.filter (
        (d: any) => d.company_name.toLowerCase().includes(query)
      );
  }
  else {
    this.getInsurenceCompanies();
  }
}

async handleCS(event: any) {
  if(event.target.value) {
    // console.log(" If event ");
      const query = event.target.value.toLowerCase();
      this.classificationSocieties = this.resultCS.filter (
        (d: any) => d.company_name.toLowerCase().includes(query)
      );
  }
  else {
    this.getClassificationSocieties();
  }
}

async handlePIC(event: any) {
  if(event.target.value) {
    // console.log(" If event ");
      const query = event.target.value.toLowerCase();
      this.piCLubs = this.resultPIC.filter (
        (d: any) => d.company_name.toLowerCase().includes(query)
      );
  }
  else {
    this.getPIClubs();
  }
}

async handleICT(event: any) {
  if(event.target.value) {
    // console.log(" If event ");
      const query = event.target.value.toLowerCase();
      this.iCT = this.resultICT.filter (
        (d: any) => d.company_name.toLowerCase().includes(query)
      );
  }
  else {
    this.getICT();
  }
}

async handleML(event: any) {
  if(event.target.value) {
    // console.log(" If event ");
      const query = event.target.value.toLowerCase();
      this.maritimeLawyers = this.resultML.filter (
        (d: any) => d.company_name.toLowerCase().includes(query)
      );
  }
  else {
    this.getMaritimeLawyers();
  }
}

}