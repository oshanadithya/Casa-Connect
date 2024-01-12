"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[2581],{2581:(b,d,r)=>{r.r(d),r.d(d,{OtpPgPageModule:()=>A});var P=r(6814),p=r(95),s=r(7311),u=r(2129),h=r(5861),m=r(9862),t=r(6689),v=r(2014),f=r(6882);const O=[{path:"",component:(()=>{class o{constructor(e,n,a,l,g,i,Y){this.storage=e,this.fb=n,this.loadingController=a,this.router=l,this.alertController=g,this.http=i,this.auth=Y,this.otp_val_msg=""}ngOnInit(){var e=this;return(0,h.Z)(function*(){e.useremail=yield e.storage.get("email"),e.google_email=yield e.storage.get("google_email"),e.apple_email=yield e.storage.get("apple_email"),e.appleid=yield e.storage.get("appleid"),e.gmailid=yield e.storage.get("gmailid")})()}back(){var e=this;return(0,h.Z)(function*(){const n=yield e.loadingController.create();yield n.present(),e.router.navigateByUrl("menu/home"),yield n.dismiss()})()}showAlert(e,n){var a=this;return(0,h.Z)(function*(){yield(yield a.alertController.create({header:e,message:n,buttons:["Okay"]})).present()})()}verify(){this.otp=this.otpNumber1.toString(),console.log("OTP :",this.otp);var e=new Headers;e.append("Accept","application/json"),e.append("Content-Type","application/json");const n={headers:new m.WM({"Content-Type":"application/json"})},a="https://casa.evokemusic.net/api/validate_user";if(this.useremail){var l;const g={otp:this.otp,uuid:null===(l=this.auth.currentUser)||void 0===l?void 0:l.uid};this.http.post(a,JSON.stringify(g),n).subscribe({next:i=>{console.log("OTP validation",i),this.verId=i.status,this.storage.set("verId",this.verId)},error:i=>{console.error(i),this.showAlert("OTP not verified","Please enter valid otp")},complete:()=>{"You enterd OTP is not correct."==this.otp_val_msg?this.showAlert("You enterd OTP is not correct.","Try again!"):(this.showAlert("OTP verification","Successfull!"),this.router.navigateByUrl("menu/home"))}})}else this.google_email?this.http.post(a,JSON.stringify({otp:this.otp,uuid:this.gmailid}),n).subscribe({next:i=>{console.log("OTP validation",i),this.otp_val_msg=i.message,this.verId=i.status,this.storage.set("verId",this.verId)},error:i=>{console.error(i),this.showAlert("OTP not verified","Please enter valid otp")},complete:()=>{"You enterd OTP is not correct."==this.otp_val_msg||"You enterd OTP is not correct."==this.otp_val_msg?this.showAlert("You enterd OTP is not correct.","Try again!"):(this.showAlert("OTP verification","Successfull!"),this.router.navigateByUrl("menu/home"))}}):this.http.post(a,JSON.stringify({otp:this.otp,uuid:this.appleid}),n).subscribe({next:i=>{console.log("OTP validation",i),this.verId=i.status,this.storage.set("verId",this.verId)},error:i=>{console.error(i),this.showAlert("OTP not verified","Please enter valid otp")},complete:()=>{"You enterd OTP is not correct."==this.otp_val_msg?this.showAlert("You enterd OTP is not correct.","Try again!"):(this.showAlert("OTP verification","Successfull!"),this.router.navigateByUrl("menu/home"))}})}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(v.K),t.Y36(p.qu),t.Y36(s.HT),t.Y36(u.F0),t.Y36(s.Br),t.Y36(m.eN),t.Y36(f.gx))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-otp-pg"]],decls:16,vars:2,consts:[[3,"translucent"],["slot","start"],[3,"click"],[1,"ion-padding"],[2,"position","static"],[2,"align-items","center"],[2,"margin","auto"],["type","tel","maxlength","4",2,"margin-left","35%","font-size","x-large",3,"ngModel","ngModelChange"],["size","small",2,"float","left","margin-bottom","10px",3,"click"]],template:function(e,n){1&e&&(t.TgZ(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-buttons",1)(3,"ion-button",2),t.NdJ("click",function(){return n.back()}),t._uU(4,"Back"),t.qZA()()()(),t.TgZ(5,"ion-content",3)(6,"ion-card",4)(7,"ion-card-content",5)(8,"p"),t._uU(9,"Please enter the OTP which has been sent to your email"),t.qZA(),t._UZ(10,"br"),t.TgZ(11,"ion-item",6)(12,"ion-input",7),t.NdJ("ngModelChange",function(l){return n.otpNumber1=l}),t.qZA()(),t._UZ(13,"br"),t.TgZ(14,"ion-button",8),t.NdJ("click",function(){return n.verify()}),t._uU(15,"Verify OTP"),t.qZA()()()()),2&e&&(t.Q6J("translucent",!0),t.xp6(12),t.Q6J("ngModel",n.otpNumber1))},dependencies:[p.JJ,p.nD,p.On,s.YG,s.Sm,s.PM,s.FN,s.W2,s.Gu,s.pK,s.Ie,s.sr,s.j9]}),o})()}];let y=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[u.Bz.forChild(O),u.Bz]}),o})();var T=r(6642);let A=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[P.ez,p.u5,s.Pc,y,T.Xz,p.UX]}),o})()}}]);