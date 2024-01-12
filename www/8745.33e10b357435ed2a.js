"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8745],{8745:(Y,d,a)=>{a.r(d),a.d(d,{MessagingPageModule:()=>N});var g=a(6814),p=a(95),l=a(7311),u=a(2129),m=a(5861),h=a(7398),_=a(4664),f=a(2096),v=a(8180),t=a(6689),C=a(2014),M=a(7613),Z=a(6882),y=a(1786);let T=(()=>{class e{constructor(){this.onClick=new t.vpe}ngOnInit(){}redirect(){this.onClick.emit(this.item)}}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-user-list"]],inputs:{item:"item"},outputs:{onClick:"onClick"},decls:5,vars:2,consts:[["lines","full","detail","true",2,"width","90%","margin","auto","border-radius","5px","padding-bottom","1vh",3,"click"],["slot","start"],[3,"src"],["slot","end","color","medium"]],template:function(n,i){1&n&&(t.TgZ(0,"ion-item",0),t.NdJ("click",function(){return i.redirect()}),t.TgZ(1,"ion-avatar",1),t._UZ(2,"img",2),t.qZA(),t.TgZ(3,"ion-text",3),t._uU(4),t.qZA()()),2&n&&(t.xp6(2),t.Q6J("src",null==i.item?null:i.item.photo,t.LSH),t.xp6(2),t.Oqu(null==i.item?null:i.item.name))},dependencies:[l.BJ,l.Ie,l.yW]}),e})();const P=["new_chat"],x=["popover"];function U(e,s){if(1&e&&(t.ynx(0),t.TgZ(1,"ion-avatar",1),t._UZ(2,"img",12),t.qZA(),t.TgZ(3,"ion-label"),t._uU(4),t.qZA(),t.BQk()),2&e){const n=s.ngIf,i=t.oxw(3);let o,r;t.xp6(2),t.Q6J("src",null==(o=i.getUser(n))?null:o.photo,t.LSH),t.xp6(2),t.hij(" ",null==(r=i.getUser(n))?null:r.name," ")}}function J(e,s){if(1&e){const n=t.EpF();t.TgZ(0,"ion-item",11),t.NdJ("click",function(){const r=t.CHM(n).$implicit,c=t.oxw(2);return t.KtG(c.getChat(r))}),t.YNc(1,U,5,2,"ng-container",4),t.ALo(2,"async"),t.qZA()}if(2&e){const n=s.$implicit;t.Q6J("detail",!0),t.xp6(1),t.Q6J("ngIf",t.lcZ(2,2,null==n?null:n.user))}}function R(e,s){if(1&e){const n=t.EpF();t.TgZ(0,"app-user-list",18),t.NdJ("onClick",function(o){t.CHM(n);const r=t.oxw(4);return t.KtG(r.startChat(o))}),t.qZA()}2&e&&t.Q6J("item",s.$implicit)}function A(e,s){if(1&e&&(t.TgZ(0,"ion-content",15)(1,"ion-list",16),t.YNc(2,R,1,1,"app-user-list",17),t.qZA()()),2&e){const n=s.ngIf;t.xp6(1),t.Udp("background","transparent"),t.xp6(1),t.Q6J("ngForOf",n)}}function F(e,s){if(1&e){const n=t.EpF();t.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-title"),t._uU(3,"New Chat"),t.qZA(),t.TgZ(4,"ion-buttons",13)(5,"ion-button",2),t.NdJ("click",function(){t.CHM(n);const o=t.oxw(2);return t.KtG(o.cancel())}),t._uU(6,"Cancel"),t.qZA()()()(),t.YNc(7,A,3,3,"ion-content",14),t.ALo(8,"async")}if(2&e){const n=t.oxw(2);t.xp6(7),t.Q6J("ngIf",t.lcZ(8,1,n.users))}}function Q(e,s){if(1&e){const n=t.EpF();t.TgZ(0,"ion-list")(1,"ion-header",7),t._uU(2,"Recent Chats"),t.qZA(),t._UZ(3,"br"),t.YNc(4,J,3,4,"ion-item",8),t._UZ(5,"br")(6,"br"),t.TgZ(7,"ion-modal",9,10),t.NdJ("willDismiss",function(o){t.CHM(n);const r=t.oxw();return t.KtG(r.onWillDismiss(o))}),t.YNc(9,F,9,3,"ng-template"),t.qZA()()}if(2&e){const n=s.ngIf,i=t.oxw();t.xp6(4),t.Q6J("ngForOf",n),t.xp6(3),t.Q6J("isOpen",i.open_new_chat)}}const k=[{path:"",component:(()=>{class e{constructor(n,i,o,r,c,G){this.storage=n,this.api=i,this.auth=o,this.loadingController=r,this.router=c,this.chatService=G,this.open_new_chat=!1,this.user=null,this.auth.onAuthStateChanged(I=>{this.user=I})}ngOnInit(){var n=this;return(0,m.Z)(function*(){const i=yield n.loadingController.create();yield i.present(),n.gmailid=yield n.storage.get("gmailid"),console.log("gmailid :",n.gmailid),n.gmailid?n.getRoomsForGoogle():n.getRooms(),yield i.dismiss()})()}back(){var n=this;return(0,m.Z)(function*(){const i=yield n.loadingController.create();yield i.present(),n.router.navigateByUrl("menu/home"),yield i.dismiss()})()}newChat(){this.router.navigateByUrl("menu/network")}getUsers(){this.chatService.getUsers(),this.users=this.chatService.users}getRooms(){this.chatService.getChatRooms(),this.chatRooms=this.chatService.chatRooms,console.log("chatRooms: ",this.chatRooms)}getRoomsForGoogle(){this.chatRooms=this.api.collectionDataQuery("chatRooms",this.api.whereQuery("members","array-contains",this.gmailid)).pipe((0,h.U)(n=>(n.map(i=>{const o=i.members.filter(c=>c!=this.gmailid),r=this.api.docDataQuery(`users/${o[0]}`,!0);i.user=r}),console.log("chatRooms :",n),n)),(0,_.w)(n=>(0,f.of)(n)))}onWillDismiss(n){}cancel(){this.modal.dismiss(),this.open_new_chat=!1}startChat(n){var i=this;return(0,m.Z)(function*(){try{const o=yield i.chatService.createChatRoom(null==n?void 0:n.uid);console.log("Room: ",o),i.cancel(),i.router.navigate(["/","messaging","chats",null==o?void 0:o.id],{queryParams:{name:null==n?void 0:n.name}})}catch(o){console.log(o)}})()}getChat(n){(null==n?void 0:n.user).pipe((0,v.q)(1)).subscribe(i=>{console.log("data :",i),this.router.navigate(["/","messaging","chats",null==n?void 0:n.id],{queryParams:{name:null==i?void 0:i.name}})})}getUser(n){return n}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(C.K),t.Y36(M.s),t.Y36(Z.gx),t.Y36(l.HT),t.Y36(u.F0),t.Y36(y.a))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-messaging"]],viewQuery:function(n,i){if(1&n&&(t.Gf(P,5),t.Gf(x,5)),2&n){let o;t.iGM(o=t.CRH())&&(i.modal=o.first),t.iGM(o=t.CRH())&&(i.popover=o.first)}},decls:11,vars:3,consts:[["translcant","true"],["slot","start"],[3,"click"],[1,"ion-padding"],[4,"ngIf"],["slot","fixed","horizontal","end","vertical","bottom"],["name","add"],[2,"font-size","x-large","margin-left","10px"],[3,"detail","click",4,"ngFor","ngForOf"],[3,"isOpen","willDismiss"],["new_chat",""],[3,"detail","click"],[3,"src"],["slot","end"],["color","light",4,"ngIf"],["color","light"],["line","none",1,"ion-margin-top"],[3,"item","onClick",4,"ngFor","ngForOf"],[3,"item","onClick"]],template:function(n,i){1&n&&(t.TgZ(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-buttons",1)(3,"ion-button",2),t.NdJ("click",function(){return i.back()}),t._uU(4,"Back"),t.qZA()()()(),t.TgZ(5,"ion-content",3),t.YNc(6,Q,10,2,"ion-list",4),t.ALo(7,"async"),t.TgZ(8,"ion-fab",5)(9,"ion-fab-button",2),t.NdJ("click",function(){return i.newChat()}),t._UZ(10,"ion-icon",6),t.qZA()()()),2&n&&(t.xp6(6),t.Q6J("ngIf",t.lcZ(7,1,i.chatRooms)))},dependencies:[g.sg,g.O5,l.BJ,l.YG,l.Sm,l.W2,l.IJ,l.W4,l.Gu,l.gu,l.Ie,l.Q$,l.q_,l.wd,l.sr,l.ki,T,g.Ov]}),e})()},{path:"chats/:id",loadChildren:()=>a.e(8479).then(a.bind(a,8479)).then(e=>e.ChatPageModule)}];let w=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[u.Bz.forChild(k),u.Bz]}),e})(),N=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[g.ez,p.u5,l.Pc,w]}),e})()}}]);