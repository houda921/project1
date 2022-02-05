// import { Component } from '@angular/core';

// import { Platform } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { LottieSplashScreen } from '@ionic-native/lottie-splash-screen/ngx';
// @Component({
//   selector: 'app-root',
//   templateUrl: 'app.component.html',
//   styleUrls: ['app.component.scss']
// })
// export class AppComponent {
//   constructor(
//     private platform: Platform,
//     private lottieSPlashScreen: LottieSplashScreen,
//     private statusBar: StatusBar
//   ) {
//     this.initializeApp();
//   }

//   initializeApp() {
//     this.lottieSPlashScreen.show();
//     this.platform.ready().then(() => {
//       this.statusBar.styleDefault();
//       setTimeout(()=>{
//         this.lottieSPlashScreen.hide();
//       },4000);
      
//     });
//   }
// }  
import { Platform } from '@ionic/angular';
 import { SplashScreen } from '@ionic-native/splash-screen/ngx';
 import { StatusBar } from '@ionic-native/status-bar/ngx';
 import { LottieSplashScreen } from '@ionic-native/lottie-splash-screen/ngx';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor( private statusBar:StatusBar ,
    private platform :Platform , 
    private splashScreen :StatusBar
    ){  
      this.initializeApp(); 
   } 

 initializeApp(){ 
this.platform.ready().then(()=>
{ 
this.statusBar.styleDefault(); 
this.splashScreen.styleDefault(); 
this.checkDarktheme();
});
 }
      

  signOut() {
    console.log('signout');
  }  
  checkDarktheme(){  
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)'); 
    if(prefersDark.matches){ 
      document.body.classList.toggle('dark');
    }
  } 
  public pages: any[] = [
    {title: 'Home', url: '/home', icon: 'home'},
    {title: 'Profile', url: '/profile', icon: 'person'},
    {title: 'About Us', url: '/about', icon: 'information-circle'},
    {title: 'Privacy Policy', url: '/privacy', icon: 'document-lock'},
    {title: 'Sign Out', url: '', icon: 'log-out', route: true},
  ];
  
}
