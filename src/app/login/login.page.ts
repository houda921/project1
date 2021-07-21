import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
//import { createPublicKey } from 'crypto'; 
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../shared/authentication.service';
//import { alertController } from 'https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/index.esm.js';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
  constructor( public authServices :AuthenticationService ,public router :Router ,public alertController:AlertController){}
    //  ,window.alertController = alertController;) { }

  ngOnInit() {
  } 
  
  logIn(email , password){  
    ( this.authServices.signIn(email.value,password.value) )
     .then((res)=>{ 
       //console.log(res.user.uid) 
       localStorage.setItem('uid',res.user.uid),
      //console.log(localStorage.getItem('uid')) 
     this.router.navigate(['/upload-image']);   
    //this.welcome(); 


     }).catch((error)=>{ window.alert(error.message)})
 
   }  
   async welcome(){ 
    // const button = document.querySelector('ion-button');
    // button.addEventListener('click', handleButtonClick); 
    

    //async function handleButtonClick() { 
      
      const alert = await this.alertController.create({ 
        header: 'welcome!',
        message: 'Do you agree to use this lightsaber to do good across the galaxy?',
        buttons: ['Disagree', 'Agree']
      });

      await alert.present();
    }
   
   registerPage(){ 
    this.router.navigate(['/profile']);
   }    
   ImagePage(){ 
    this.router.navigate(['/upload-image']);
   }   
   

}
