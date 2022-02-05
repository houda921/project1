import { Component, OnInit, ViewChild , NgZone, ElementRef} from '@angular/core';
import * as Leaflet from 'leaflet';
import { ScrollDetail } from '@ionic/core';
import {  ModalController } from '@ionic/angular';
import { map, single } from 'rxjs/operators'; 
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
 import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms'
 import {AuthService} from 'src/app/services/authservice';
 import {AlertController, NavController,LoadingController,} from '@ionic/angular' 
 import {Router} from '@angular/router';
 import { AppPreferences } from '@ionic-native/app-preferences/ngx'; 
 import { ReactiveFormsModule } from '@angular/forms'  
//angularFireModule permet de connecter a firebase  
// //angularFireStore permet de manipuler les donnnees 
 import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
  import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
// //Observable permet de recuperer les donnees d'une maniere dynamique 
 import { Observable } from 'rxjs';
 
 import { FirestoreService } from '../services/firestoreservice';
 import { NativeGeocoder,NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
 import { MarkersService } from 'src/app/services/markers.service'; 
 import { Geolocation } from '@ionic-native/geolocation/ngx';
import {  NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx'; 
import L, { ControlPosition, FeatureGroup, MarkerOptions, Map } from 'leaflet'; 
// import
import {GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'; 
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import firebase from 'firebase';
import { AngularFireModule } from '@angular/fire';



// export interface imageData{
//   fileName: string;
//   filePath: string;
//  size: string;} 
interface Todo { 
  id:any,
  name: string,
  latitude: any,
  longitude:any, 
  treeNbr:any, 
  treename:any,
  checked: boolean; 

} 
declare var FCMPlugin;
 @Component({
   selector: 'app-addtree',
   templateUrl: './addtree.page.html',
   styleUrls: ['./addtree.page.scss'], 
   
 })
 export class AddtreePage implements OnInit { 
  @ViewChild('searchbar', {read: ElementRef}) searchbar: ElementRef;
  lat: any; 
  long: any;
  address: any;
  accuracy: any;   
  private nearbyPlaces: Array<any> = [];
  private addressElement: HTMLInputElement = null;
  fireauth: any; 
  //I replace here firestore by fire 
  fire = firebase.database().ref('/pushtokens');
  firemsg = firebase.database().ref('/messages');
  
  getAdress(){ 
    Leaflet.Control.geocoder()
  }
  
//     validationMessages = {
//       name: [{type:"required", message:"s'il vous plait inserrez la location"}],
//       treename: [{type:"required", message:"s'il vous plait inserrez le nom de l'arbre."}],
      
//       treeNbr: [{type:"required", message:"s'il vous plait inserrez le nombre d'arbre"}], 
      
//       Image:[{type:"required", message:"s'il vous plait inserrez image"}]
//    }

//    ValidationFormUSer : FormGroup;
//    loadingC:any; 
//    fileName:string;
//   fileSize: string;
//   isLoading:boolean;
//   isLoaded: boolean;
//  private imageCollection: AngularFirestoreCollection<imageData>; 
//  private treeCollection: AngularFirestoreCollection<imageData>;
//   imagefile: Observable<imageData[]>; 
//   treefile: Observable<imageData[]>;
//   treeUpload: AngularFireUploadTask;
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
//     , private firestore: AngularFirestore, private nav: NavController,private database: AngularFirestore, private storage: AngularFireStorage, private MarkersS:MarkersService){
//     this.loadingC = this.loadingCtrl 
//     this.isLoading = false;
//     this.isLoaded = false;
//     this.imageCollection = this.database.collection<imageData>('loginUploads'); 
//     this.treeCollection = this.database.collection<imageData>('treeUploads');
//     this.imagefile = this.imageCollection.valueChanges();
//     this.treefile = this.imageCollection.valueChanges();
//    }

//   ngOnInit() {
//   this.ValidationFormUSer = this.formbuilder.group({ 
//     //name is the location
//     name: new FormControl('', Validators.compose([
//        Validators.required
//     ])), 
//     treename: new FormControl('', Validators.compose([
//       Validators.required
//    ])),

//     treeNbr: new FormControl('', Validators.compose([
//       Validators.required
//     ])),
    

    
//     image: new FormControl('', Validators.compose([
//       Validators.required,
      
//     ]))

//   })

//   }
// displayname :string ;
// phoneNumber:number ;
//   registerUser(value){
//    this.showalert();
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
//      this.loadingC.dismiss();
//      this.router.navigate(['loginscreen']);
//      }
//    }, error=>{
//      this.loadingC.dismiss();
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
//         this.navCtr.navigateBack(['map'])
//       }
//       }]
//     })
//      await loading.present();
//   }




//   async showalert(){
//  var load = await this.loadingCtrl.create({
//    message:"please wait....",

//  })
//   load.present();
// } 
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

//   const path =  `treeUploads/${new Date().getTime()}_${fileName.name}`;

//   var fileRef = this.storage.ref(path);

//   this.treeUpload = this.storage.upload(path,fileName);
//   this.loading.dismiss();

//   this.percentage = this.treeUpload.percentageChanges();

//   this.treeUpload.then( res=>{
//     var imagefile = res.task.snapshot.ref.getDownloadURL();
//     imagefile.then( downloadableUrl=>{
//       console.log("URL", downloadableUrl);
//       // this.database.doc(`profile/${this.authservice.getUID()}`).update({
//       //   photoUrl: downloadableUrl
//       // });
//     })
//   })
 
  

// }  
// AddtreePage(){ 
//   this.MarkersS.saveTree
// }
// goToNextPage(){
//   this.router.navigate(['tabs']);
// }
//   }

Markers: Todo[];
  model: Todo;
  isEditing: boolean = false;
  showForm: boolean; 
  openMenu = false;
  @ViewChild('slidingList', {static: false}) slidingList;
   
   
  
   map: any;

  constructor(private firestore: FirestoreService ,private router :Router ,private navctr:NavController ,private MarkersService:MarkersService ,private markersS:MarkersService  ,private nativeGeocoder:NativeGeocoder ,private geolocation: Geolocation,
    public af: AngularFireModule ,
    public navCtrl: NavController,
    
    private zone: NgZone,
    protected alertCtrl: AlertController,
    private viewCtrl: NavController) {
  
     this.fireauth = firebase.auth();
this.fireauth.signInWithEmailAndPassword("duttasubh2010@gmail.com", "India@123").then((res) => {
console.log("logged in");
}); 

       
    this.loadData();
    this.model = {
      name:'',
      latitude:'' ,
      longitude:'',
      treeNbr:'',
      treename:'', 
      id:'',
      checked:false
    } 
    
  }  
  ngOnInit(): void {
    //  throw new Error('Method not implemented.');
   }
   choosePOsition() {
     this.router.navigate(['map1'])
   }
  geoInformation() { 
    
    this.geolocation.getCurrentPosition().then((data) => { 
     
      this.lat = data.coords.latitude;
      this.long = data.coords.longitude;
      this.accuracy = data.coords.accuracy; 
       this.model.latitude=data.coords.latitude; 
       this.model.longitude=data.coords.longitude; 
       
      console.log('erreuuuuuuuuuuuuuuuuuuuuur')
      this.cordsToAddress(this.lat, this.long);
     }).catch((error) => {
       alert(error);
     });
  } 
  

  // geocoder options
  nativeGeocoderOptions: NativeGeocoderOptions = {
    maxResults: 6,
    useLocale: true
  };  
  
  

  // reverse geocode
  cordsToAddress(lat, long){
    this.nativeGeocoder.reverseGeocode(lat, long, this.nativeGeocoderOptions)
    .then((response: NativeGeocoderResult[]) => {
      this.address = this.createAddress(response[0]);
    }).catch((error: any) => {
      alert(JSON.stringify(error));
    });
  }

  // Create address
  createAddress(addressObject){
    let object = [];
    let address = "";
    for (let key in addressObject) {
      object.push(addressObject[key]);
    }
    object.reverse();
    for (let val in object) {
      if(object[val].length)
      address += object[val]+', ';
    }
    return address.slice(0, -2);
  }

   
  loadData() {
    this.firestore.getAllDocuments("Markers").subscribe((e) => {
      let arr: Todo[] = [];
      if (e && e.length > 0) {
        e.forEach(item => {
          const obj: Todo = item.payload.doc.data() as unknown as Todo;
          obj.id = item.payload.doc.id;
          arr.push(obj)
        });
      }

      this.Markers = arr;
    });
  }

  toggleCheck(item): void {
    this.isEditing = true;
    item.checked = !item.checked;
    this.model = item;
    this.addMarker();
  }

  addMarker(): void {
    if (!this.model.name ) {
      return;
    }
    if (!this.isEditing) {
      this.firestore.addDocument("Markers", this.model).then(() => {
        this.loadData();//refresh view
      });
    } else {
      this.firestore.updateDocument("Markers", this.model.id, this.model).then(() => {
        this.loadData();//refresh view
      });
    }
    this.isEditing = false;
    //clear form
    this.model.checked = false;
    this.model.name = ''; 
    this.model.latitude=''; 
    this.model.longitude='';
    this.model.treeNbr=''; 
    this.model.treename='';
    this.showForm = false; 
    console.log('added');  
    this.geoCodeandAdd(this.model.name); 
this.loadMarkers(); 
this.router.navigate(['map']);
    
 
  } 
  
  geoCodeandAdd(city)
  { 
this.nativeGeocoder.forwardGeocode(city).then((coordinates:NativeGeocoderResult[])=>{ 
    this.addMarker();
}).catch((error:any)=>console.log(error));
  }  
  loadMarkers(){  
    var greenIcon = new Leaflet.Icon({ 
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [20, 40],
      iconAnchor: [12, 40],
      popupAnchor: [1, -34],
      shadowSize: [20, 40]
    });
    
    
    this.markersS.getAllMarkers().subscribe((marker:any )=>{ 
       marker.forEach((singlemarker:any)=>{ 
         let markerGroup=Leaflet.featureGroup(); 
         let marker :any= Leaflet.marker([singlemarker.latitude,singlemarker.longitude] ,{icon:greenIcon}).addTo(this.map)
          .bindPopup("<ion-label>"+"l'emplacement  :"+singlemarker.name+"</ion-label>"+"<br>" +
          "<ion-label>"+"le nombre d'arbre :"+singlemarker.treeNbr+"</ion-label>"+"<br>" + 
          "<ion-label>"+"le nom d'arbre :"+singlemarker.treename+"</ion-label>"+"<br>"
          ).openPopup();
           
          markerGroup.addLayer(marker);  
         
       this.map.addLayer(markerGroup); 
         }) 
       })
     
  }

  updateMarker(obj) {
    this.showForm = true;
    this.model = obj;
    this.isEditing = true;
    this.slidingList.closeSlidingItems();
  }

  deleteMarker(id: string) {
    this.slidingList.closeSlidingItems();
    this.firestore.deleteDocument("Markers", id).then(() => {
      this.loadData();//refresh view
      this.isEditing = false;
    });
  }


  addItem(): void {
     this.slidingList.closeSlidingItems();
    this.showForm = !this.showForm;
  }

  trackByFn(index: number, item: any): number {
    return index; // or item.id
  }



  navigateToProfile() 
  { 
    this.router.navigate(['profile']);
  } 
  navigateToMap(){ 
    this.router.navigate(['map']);
  } 
  togglePopupMenu() {
    return this.openMenu = !this.openMenu;
  }

  goToAccount() {
    alert('Account clicked.');
    this.togglePopupMenu();
  }

  goToHome() {
    alert('map clicked.');
    this.togglePopupMenu();
  }

  goToCups() {
    alert('Cups clicked.');
    this.togglePopupMenu();
  }

  goToLeaderboard() {
    alert('Leaderboard clicked.');
    this.togglePopupMenu();
  }

  goToHelp() {
    alert('Help clicked.');
    this.togglePopupMenu();
  }

  goToShop() {
    alert('Shop clicked.');
    this.togglePopupMenu();
  }  
  // ionViewDidLoad() {
  //   // this.initAutocomplete();
  //   this.loadNearbyPlaces();
  // }

//   dismiss(location?: google.maps.LatLng) {
//     if (location) {
//       this.mapService.mapCenter = location;
//     }
//     if (this.addressElement) {
//       this.addressElement.value = '';
//     }
//     this.dismiss();
//   }

//   tokensetup() {
//       var promise = new Promise((resolve, reject) => {
//         FCMPlugin.getToken(function(token){
//         resolve(token);
//         }, (err) => {
//           reject(err);
//       });
//       })
//       return promise;
//   }

//   storetoken(t) {
//       this.afd.list(this.fire).push({
//         uid: firebase.auth().currentUser.uid,
//         devtoken: t
          
//       }).then(() => {
//         console.log('Token stored');
//         }).catch(() => {
//           console.log('Token not stored');
//         })
   
//       this.afd.list(this.firemsg).push({
//         messageto: 'officer',
//         sendername: 'victim',
//         message: 'Control Room: Your case has been registered with Lal Bazar.'
//       }).then(() => {
//         console.log('Message stored');
//         }).catch(() => {
//           console.log('Message not stored');
//     })  

//     this.afd.list(this.firemsg).push({
//         messageto: 'officer',
//         sendername: 'officer',
//         message: 'Control Room: A case has been assigned to you. Please look into it Asap.'
//       }).then(() => {
//         console.log('Message stored');
//         }).catch(() => {
//           console.log('Message not stored');
//     }) 
//   }

//   /***
//    * Place item has been selected
//    */
//  async selectPlace(place: any) {
//     let alert = this.alertCtrl.create({
//     //title: 'Officer Assignment',
//     message: 'Do you want to proceed with the assignment?',
//     buttons: [
//       {
//         text: 'Cancel',
//         role: 'cancel',
//         handler: () => {
//           console.log('Ignore this case');
//         }
//       },
//       {
//         text: 'Assign',
//         handler: () => {
//           console.log('Assign on this case');

//           this.afd.list(this.firemsg).push({
//               messageto: 'officer',
//               sendername: 'victim',
//               message: 'Control Room: Your case has been registered with Lal Bazar.|'+place.id+'|'
//             }).then(() => {
//               console.log('Message stored');
//               }).catch(() => {
//                 console.log('Message not stored');
//           });  

//           this.afd.list(this.firemsg).push({
//               messageto: 'officer',
//               sendername: 'officer',
//               message: 'Control Room: A case has been assigned to you.|'+place.id+'|'
//             }).then(() => {
//               console.log('Message stored');
//               }).catch(() => {
//                 console.log('Message not stored');
//           }); 

//           this.navCtrl.navigateForward(AboutPage);
//           // this.tokensetup().then((token) => {
//           //   this.storetoken(token);
//           //   this.navCtrl.push(AboutPage);
//           // })
//         }
//       }
//     ]
//   });
//   (await alert).present();
//     // this.dismiss(place.geometry.location);
//   }

//   private initAutocomplete(): void {
//     // reference : https://github.com/driftyco/ionic/issues/7223
//     this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');
//     this.mapService.createAutocomplete(this.addressElement).subscribe((location) => {
//       this.dismiss(location);
//     }, (error) => {
//       this.displayErrorAlert();
//       console.error(error);
//     });
//   }
//    displayErrorAlert() {
//      throw new Error('Method not implemented.');
//    }

//   private loadNearbyPlaces(): void {
//     this.nearbyPlaces = [
//       {
//         id: "0",
//         distance:"179.24",
//         name:"Pravas Sen",
//         vicinity:"98, Christopher Road, Brindaban Garden, Seal Lane, Tangra, Kolkata",
//         icon:"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png"
//       },
//       {
//         id: "1",
//         distance:"279.24",
//         name:"Karan Mehta",
//         vicinity:"98, Christopher Road, Brindaban Garden, Seal Lane, Tangra, Kolkata",
//         icon:"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png"
//       },
//       {
//         id: "2",
//         distance:"379.24",
//         name:"Pravas Sen",
//         vicinity:"98, Christopher Road, Brindaban Garden, Seal Lane, Tangra, Kolkata",
//         icon:"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png"
//       },
//       {
//         id: "3",
//         distance:"479.24",
//         name:"Pravas Sen",
//         vicinity:"98, Christopher Road, Brindaban Garden, Seal Lane, Tangra, Kolkata",
//         icon:"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png"
//       },
//       {
//         id: "4",
//         distance:"579.24",
//         name:"Pravas Sen",
//         vicinity:"98, Christopher Road, Brindaban Garden, Seal Lane, Tangra, Kolkata",
//         icon:"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png"
//       }

//     ];

    // this.mapService.loadNearbyPlaces().subscribe((_nearbyPlaces) => {
    //   // force NgZone to detect changes
    //   this.zone.run(() => {
    //     this.nearbyPlaces.push.apply(this.nearbyPlaces, _nearbyPlaces);
    //   });
    // }, (error) => {
    //   this.displayErrorAlert();
    //   console.error(error);
    // });
  }

  
