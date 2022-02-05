// import { Component, OnInit } from '@angular/core';
// import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms'
// import {AuthService} from 'src/app/services/authservice';
// import {AlertController, NavController,LoadingController} from '@ionic/angular'
// import {Router} from '@angular/router';
// import { AppPreferences } from '@ionic-native/app-preferences/ngx'; 
// import { ReactiveFormsModule } from '@angular/forms'  
// //angularFireModule permet de connecter a firebase  
// //angularFireStore permet de manipuler les donnnees 
// import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
// import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
// //Observable permet de recuperer les donnees d'une maniere dynamique 
// import { Observable } from 'rxjs';
// export interface imageData{
//   fileName: string;
//   filePath: string;
//   size: string;}
// @Component({
//   selector: 'app-sign-up',
//   templateUrl: './sign-up.page.html',
//   styleUrls: ['./sign-up.page.scss'],
// })
// export class SignUpPage implements OnInit {
//    validationMessages = {
//       names: [{type:"required", message:"Please Enter your Full Names"}],
//       phone: [{type:"required", message:"Please Enter your Phone No."}],
//       email: [
//         {type: 'required',message:"Enter your Email Adress"},
//         {type:"pattern", meesage:"Please the Email Entered is Incorrect. Try again.."}
//       ],
//       password: [
//         {type: "required", message: "password is required here"},
//         {type:"minlength", message: "Passwrd must be at least 6 character"}
//       ], 
//       Image:[{type:"required", message:"Please Enter your image"}]
//    }

//    ValidationFormUSer : FormGroup;
//    loadingC:any; 
//    fileName:string;
//   fileSize: string;
//   isLoading:boolean;
//   isLoaded: boolean;
//  private imageCollection: AngularFirestoreCollection<imageData>;
//   imagefile: Observable<imageData[]>;
//   imageUpload: AngularFireUploadTask;
//   percentage: Observable<number>;
//   snapshot: Observable<any>;
//   FileImageUPload: Observable<any>;
//   UserUID: AngularFirestoreDocument;
//   authservice: any;

//   constructor(private router: Router, private preference: AppPreferences,
//      private navCtr: NavController ,private formbuilder:FormBuilder, 
//      private authService: AuthService, 
//      public loadingCtrl : LoadingController, private alertCtrl: AlertController 
//      ,private loading :LoadingController
//     , private firestore: AngularFirestore, private nav: NavController,private database: AngularFirestore, private storage: AngularFireStorage,){
//     this.loadingC = this.loadingCtrl 
//     this.isLoading = false;
//     this.isLoaded = false;
//     this.imageCollection = this.database.collection<imageData>('loginUploads');
//     this.imagefile = this.imageCollection.valueChanges();
//    }

//   ngOnInit() {
//   this.ValidationFormUSer = this.formbuilder.group({
//     names: new FormControl('', Validators.compose([
//        Validators.required
//     ])),

//     phone: new FormControl('', Validators.compose([
//       Validators.required
//     ])),
//     email: new FormControl('', Validators.compose([
//       Validators.required,
//       Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
//     ])),

//     password: new FormControl('', Validators.compose([
//       Validators.required,
//       Validators.minLength(6)
//     ])), 
//     // image: new FormControl('', Validators.compose([
//     //   Validators.required,
      
//     // ]))

//   })

//   }
// displayname :string ;
// phoneNumber:number ;
//   registerUser(value){
//   //  this.showalert();
//     try{
//    this.authService.userRegistration(value).then( response =>{
//      console.log(response);
//      if(response.user){
//        response.user.updateProfile({
//          displayName: 
//          value.names,
//          email: value.email,
//          phoneNumber: value.phone 
         
//        });
//     this.preference.store(value.phone,'userPhoneNumber'); 
//     this.preference.store(value.email,'userEmail'); 
//     this.preference.store(value.names,'userNames');
//     //  this.loadingC.dismiss();
//      this.router.navigate(['loginscreen']);
//      }
//    }, error=>{
//     //  this.loadingC.dismiss();
//      this.errorLoading(error.message);

//    })
//  }catch(erro){
//    console.log(erro)
// }
//   }


//   async errorLoading(message: any){
//     const loading = await this.alertCtrl.create({
//       header:"Error Registering",
//       message:message,
//       buttons:[{
//         text:'ok',
//         handler: ()=>{
//         this.navCtr.navigateBack(['signup'])
//       }
//       }]
//     })
//      await loading.present();
//   }




// //   async showalert(){
// //  var load = await this.loadingCtrl.create({
// //    message:"please wait....",

// //  })
// //   load.present();
// // } 
//  async uploadImagetoFirebase(event){

//   const load = await this.loading.create({
//     spinner:'dots',
//   })
//      load.present();
 
//   const file = event.target.files;
//   console.log(file);
//   var fileName = file[0];
//   console.log(fileName);

//   if(fileName.type.split('/')[0] !=="image" ){
//     console.error("File is not an Image");
//     return;
//   }

//   this.isLoading = true;
//   this.isLoaded = false;

//   const path =  `loginUploads/${new Date().getTime()}_${fileName.name}`;

//   var fileRef = this.storage.ref(path);

//   this.imageUpload = this.storage.upload(path,fileName);
//   this.loading.dismiss();

//   this.percentage = this.imageUpload.percentageChanges();

//   this.imageUpload.then( res=>{
//     var imagefile = res.task.snapshot.ref.getDownloadURL();
//     imagefile.then( downloadableUrl=>{
//       console.log("URL", downloadableUrl);
//       this.database.doc(`profile/${this.authservice.getUID()}`).update({
//         photoUrl: downloadableUrl
//       });
//     })
//   })
 
  

// }
// goToNextPage(){
//   this.router.navigate(['tabs']);
// }

// } 
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms'
import {AuthService} from 'src/app/services/authservice';
import {AlertController, NavController,LoadingController} from '@ionic/angular'
import {Router} from '@angular/router';
import { AppPreferences } from '@ionic-native/app-preferences/ngx';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
   validationMessages = {
      names: [{type:"required", message:"Please Enter your Full Names"}],
      phone: [{type:"required", message:"Please Enter your Phone No."}],
      email: [
        {type: 'required',message:"Enter your Email Adress"},
        {type:"pattern", meesage:"Please the Email Entered is Incorrect. Try again.."}
      ],
      password: [
        {type: "required", message: "password is required here"},
        {type:"minlength", message: "Passwrd must be at least 6 character"}
      ]
   }

   ValidationFormUSer : FormGroup;
   loading:any;

  constructor(private router: Router, private preference: AppPreferences,
     private navCtr: NavController ,private formbuilder:FormBuilder, private authService: AuthService, public loadingCtrl : LoadingController, private alertCtrl: AlertController){
    this.loading = this.loadingCtrl
   }

  ngOnInit() {
  this.ValidationFormUSer = this.formbuilder.group({
    names: new FormControl('', Validators.compose([
       Validators.required
    ])),

    phone: new FormControl('', Validators.compose([
      Validators.required
    ])),
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])),

    password: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(6)
    ]))

  })

  }

  registerUser(value){
   this.showalert();
    try{
   this.authService.userRegistration(value).then( response =>{
     console.log(response);
     if(response.user){
       response.user.updateProfile({
         displayName: value.names,
         email: value.email,
        phone: value.phone
         
       });
    // this.preference.store(value.phone,'userPhoneNumber');
     this.loading.dismiss();
     this.router.navigate(['loginscreen']);
     }
   }, error=>{
     this.loading.dismiss();
     this.errorLoading(error.message);

   })
 }catch(erro){
   console.log(erro)
}
  }


  async errorLoading(message: any){
    const loading = await this.alertCtrl.create({
      header:"Error Registering",
      message:message,
      buttons:[{
        text:'ok',
        handler: ()=>{
        this.navCtr.navigateBack(['sign-up'])
      }
      }]
    })
     await loading.present();
  }




  async showalert(){
 var load = await this.loadingCtrl.create({
   message:"please wait....",

 })
  load.present();
}

}
