import { Component, OnInit,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
 
import {Camera ,CameraOptions} from "@ionic-native/camera/ngx" 
import { LoadingController, NavController } from '@ionic/angular'; 
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore'; 
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';  
//import { PowerManagement } from '@ionic-native/power-management';
import { AngularFireModule } from '@angular/fire';  
//import { Options } from 'selenium-webdriver';
import { toBase64String } from '@angular/compiler/src/output/source_map'; 
//import{ FormGroup ,FormControl} from '@angular/forms' ;
//import firebaseConfig from './firebase' 
declare var firebase ; 
var config={ 
  dataBaseURL:"your firebase project database url"
} 
firebase.initializeApp(config)
@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

afDatabase :any
afAuth:AngularFireAuth 
navCtrl:NavController  
loadingCtrl:LoadingController 
requestMsg:any 
AccountExist:any  
image1 :any
disab:any  
ngOnInit() {
  
}   
  constructor( 
    public authServices :AuthenticationService, 
    public router :Router, 
    //public Participant :ParticipantService, 
    private camera:Camera, 
    
    loader:LoadingController
  ) { }

    
//   imgfirebase(){
//     console.log("/" + this.part.key +"/"+ 'profilePicture.jpg')
//     const selfieRef = firebase.storage().ref("/" + this.part.name +"/"+ 'profilePicture.jpg');
//     selfieRef
//       .putString(this.image1, 'base64', {contentType: 'image/jpg'} )
//       .then(savedProfilePicture => {
//         firebase
//           .database()
//           .ref('images/user1/profilePicture1')
//           .set(savedProfilePicture.downloadURL);
//       });
  
//   }
  
//   async createprofile(){
//     try {
    
//   const result=await this.afAuth.createUserWithEmailAndPassword(this.part.email,this.part.password) .then(res => {
//     let user = firebase.auth().currentUser;
//    // let idclt = firebase.auth().currentUser.uid
//     //this.Participant.admin = "false"
//     //this.Participant.disabled = "true"
//  //  this.Participant.key =idclt
//  this.imgfirebase();
//   }).then(()=>this.afAuth.authState.subscribe(auth=>{

            
//     this.afDatabase.object(`Participant/${auth.uid}`).set(this.part);

//   }))

//   const resultt =await this.afAuth.signInWithEmailAndPassword(this.part.email, this.part.password).then(() => {
//    alert(this.requestMsg);
   
//     this.router.navigate(["/login"]); ;

//   })

//   setTimeout(function () {
//   //  loading.dismiss();
//   }, 5000);

//   this.disab = true;
//     }
//     catch(err) {
//   alert(this.AccountExist)
//     }
  

// }


 


//   //////////////////
// //   captureAndSave()
// //   { 
// //     let opotions:CameraOptions={ 
// //       destinationType:this.camera.DestinationType.DATA_URL, 
// //       encodingType:this.camera.EncodingType.PNG,
// //       mediaType:this.camera.MediaType.PICTURE, 
// //       quality:100
// //     } 
// //    this.camera.getPicture(Options).then((toBase64String)=>{ 
// //      alert("base64 of captured image =" + toBase64String); 
// //      var obj= { base:"data:image/png;base64,"+toBase64String}; 
// //      var reference=this; 
// //      this.loader.create({ 
// //        message:"saving to firebase realtime database"
// //      }).then((loadingElement)=> 
// //      { 
// //        loadingElement.present(); 
// //        firebase.database().ref('/image').set(obj).then(function(error)
// //        { 
// // if(error)
// // { 

// // } 
// // else { 
// // alert("saved");
// // }
// //        } 
       
// //      })

//    },(err)=>{alert(JSON.stringify(err)); }) 
//   }
////////////////
  signUp(email , password){  
   ( this.authServices.registerUser( email.value,password.value) )
    .then((res)=>{ 
       console.log(res.user.uid) 
       localStorage.setItem('uid',res.user.uid),
      console.log(localStorage.getItem('uid'))
      this.router.navigate(['/login'])
     }).catch((error)=>{ window.alert(error.message)}) 
     

   }    


  // imgfirebase(){
  //   console.log("/" + this.Participant.key +"/"+ 'profilePicture.jpg')
  //   const selfieRef = firebase.storage().ref("/" + this.Participant.name +"/"+ 'profilePicture.jpg');
  //   selfieRef
  //     .putString(this.image1, 'base64', {contentType: 'image/jpg'} )
  //     .then(savedProfilePicture => {
  //       firebase
  //         .database()
  //         .ref('images/user1/profilePicture1')
  //         .set(savedProfilePicture.downloadURL);
  //     });
  
  // }
 
  logInPage(){ 
    this.router.navigate(['/login']);
   }  
}
