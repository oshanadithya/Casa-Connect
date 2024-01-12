import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers: HttpHeaders | undefined;
  public baseUrl : any = "";
  public apiV2 : any = "https://casa.evokemusic.net/api/v2/";

  constructor(
    public http: HttpClient
  ) { 
    this.headers = new HttpHeaders();
    this.headers.append("Accept", 'application/json');
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
  }

  getNews() {
    return this.http.get('https://casa.evokemusic.net/api/news');
  }

  getEvents() {
    return this.http.get('https://casa.evokemusic.net/api/events');
  }

  getDirectory() {
    return this.http.get('https://casa.evokemusic.net/api/members');
  }

  getDirectorybyId() {
    return this.http.get('https://casa.evokemusic.net/api/member_by_id');
  }

  getAssociateMembers() {
    return this.http.get('https://casa.evokemusic.net/api/associate_members');
  }

  getGovernmentInstitutions() {
    return this.http.get('https://casa.evokemusic.net/api/institutions');
  }

  getTradeAssociations() {
    return this.http.get('https://casa.evokemusic.net/api/trade_associations');
  }

  getShipRepairers() {
    return this.http.get('https://casa.evokemusic.net/api/ship_repairers');
  }

  getBunkerLubricantSup() {
    return this.http.get('https://casa.evokemusic.net/api/bunker_lubricant_suppliers');
  }

  getAcademicInstitutions() {
    return this.http.get('https://casa.evokemusic.net/api/academic_institutions');
  }

  getShipSuppliers() {
    return this.http.get('https://casa.evokemusic.net/api/ship_suppliers');
  }

  getInsurenceCompanies() {
    return this.http.get('https://casa.evokemusic.net/api/insurance_companies');
  }

  getClassificationSocieties() {
    return this.http.get('https://casa.evokemusic.net/api/classification_societies');
  }

  getPIClubs() {
    return this.http.get('https://casa.evokemusic.net/api/pi_clubs');
  }

  getICT() {
    return this.http.get('https://casa.evokemusic.net/api/inland_container_terminals');
  }

  getMaritimeLawyers() {
    return this.http.get('https://casa.evokemusic.net/api/maritime_lawyers');
  }

  getExchangerates() {
    return this.http.get('https://casa.evokemusic.net/api/exchangeRateAll');
  }

}
