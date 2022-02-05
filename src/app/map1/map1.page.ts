import { Component, ViewChild, ElementRef , NgZone,} from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IonSlides, LoadingController, Platform } from '@ionic/angular';
import * as tslib_1 from "tslib"; 
import { ScrollDetail } from '@ionic/core'; 
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { map, single } from 'rxjs/operators'; 
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import { AngularFirestore } from '@angular/fire/firestore';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { NativeGeocoder,NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { MarkersService } from 'src/app/services/markers.service';

import { Map, tileLayer, marker, icon } from 'leaflet'; 
import { AuthService } from 'src/app/services/authservice';
import {  NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { FirestoreService } from '../services/firestoreservice'; 
import firebase from 'firebase';
import { AngularFireModule } from '@angular/fire'; 
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import {  AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage'
import { Router } from '@angular/router';

import { Observable } from 'rxjs'; 
export interface imageData{
  fileName: string;
  filePath: string;
  size: string;
}
interface Todo { 
  id:any,
  name: string,
  latitude: any,
  longitude:any, 
  treeNbr:any, 
  treename:any,
  //checked: boolean; 
  duedate:any; 
  treeUrl:any;
}  


@Component({
  selector: 'app-map1',
  templateUrl: 'map1.page.html',
  styleUrls: ['map1.page.scss'],
})
export class Map1Page {
  @ViewChild('map', { static: false }) mapContainer: ElementRef;
  @ViewChild('slides', { static: false }) slider: IonSlides;
  @ViewChild('searchbar', {read: ElementRef}) searchbar: ElementRef; 
  
  fileName:string;
  fileSize: string;
  isLoading:boolean;
  isLoaded: boolean;
  map: any;
  marker: L.Marker;
  segment = 0;
  searchKey: string;
  places = [];
  isMarkerSet: boolean = false; 
  openMenu = false;

  addressComponent: any;
  lati: any;
  longi: any; 
  Markers: Todo[];
  model: Todo;
  isEditing: boolean = false;
  showForm: boolean; 
  profileImageUrl: any;
  @ViewChild('slidingList', {static: false}) slidingList;
  lat: any; 
  long: any;
  address: any;
  accuracy: any;  
  private imageCollection: AngularFirestoreCollection<imageData>;
  imagefile: Observable<imageData[]>;
  imageUpload: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  FileImageUPload: Observable<any>;
  UserUID: AngularFirestoreDocument;  
  private nearbyPlaces: Array<any> = [];
  private addressElement: HTMLInputElement = null;
  fireauth: any; 
  //I replace here firestore by fire 
  fire = firebase.database().ref('/pushtokens');
  firemsg = firebase.database().ref('/messages');
  
  image = 'https://www.kasterencultuur.nl/editor/placeholder.jpg';
   imagePath: 'Images/${new Date().getTime()}'; 
  //imagePath:string;
  upload: any;
  

  constructor(private authservice: AuthService ,
    private database : AngularFirestore,
    public http: HttpClient,  
    private plt: Platform ,public modalCtrl: ModalController   ,
    public navCtrl:NavController  ,private firestore: FirestoreService ,
    private router :Router ,private navctr:NavController ,
    private MarkersService:MarkersService ,
    private markersS:MarkersService  ,
    private nativeGeocoder:NativeGeocoder ,
    private geolocation: Geolocation,
    public af: AngularFireModule ,
    private camera: Camera ,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public afSG: AngularFireStorage, 
    private storage: AngularFireStorage, 
    public loading: LoadingController,
    
    private zone: NgZone,
    protected alertCtrl: AlertController,
    private viewCtrl: NavController) {  
      this.fireauth = firebase.auth();
    this.loadData();
    this.model = {
      name:'',
      latitude:'' ,
      longitude:'',
      treeNbr:'',
      treename:'', 
      id:'', 
      duedate:'', 
      treeUrl:'',
     // checked:true 
     
    }
    this.isLoading = false;
    this.isLoaded = false;
    this.imageCollection = this.database.collection<imageData>('Images');
    this.imagefile = this.imageCollection.valueChanges();
    
 
}  

ionViewWillEnter() {
  console.log(this.marker);
  this.loadMap();
} 
loadMap() {
  this.map = L.map('map').fitWorld();
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'contributor',
    maxZoom: 6
  }).addTo(this.map);
  // For Web
  this.map.locate({
    setView: true,
    maxZoom: 6
  }).on('locationfound', (e) => {
    console.log(e);
    if(!this.plt.is('cordova')){
      console.log('plt is Web') 
      this.setMarkertWithAnimation(e.latitude, e.longitude, true);
    }
  })
  // For Mobile
  if(this.plt.is('cordova')){
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('plt is android/ios')
      this.setMarkertWithAnimation(resp.coords.latitude, resp.coords.longitude, true)  
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
  
   // Adding Map Click Event
  this.map.on('click', (e) => {
    console.log('Map Clicked')
    this.setMarkertWithAnimation(e.latlng.lat, e.latlng.lng, false);
  })
}

  
  search() {
    if (this.searchKey === '') {
      this.places = [];
    } else if (this.searchKey.length > 2) {
      let url = 'https://nominatim.openstreetmap.org/search?format=json&q=' + this.searchKey;
      this.http.get(url).subscribe((data: any) => {
        console.log(data);
        this.places = data;
      })
    }
    
  }
  onClickPickAddress(lat, lng) {
    this.places = [];
    console.log('0') 

    this.setMarkertWithAnimation(lat,lng, false);
  }
  

  setMarkertWithAnimation(lat, lng, force: boolean) {
    var greenIcon = new L.Icon({ 
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [20, 40],
      iconAnchor: [12, 40],
      popupAnchor: [1, -34],
      shadowSize: [20, 40]
    });
    if(!force) {
      if(this.marker !== undefined) {
        console.log('marker was already there so removing it...')
        console.log('before remove', this.marker)
        // this.map.removeLayer(this.marker);
        // this.marker = null;
        this.marker.remove();
        this.marker = L.marker([lat, lng],{icon:greenIcon}).on('click', () => {
          console.log('marker clicked');
           
        });
        this.map.addLayer(this.marker);
        console.log('after remove', this.marker)
        this.map.setView({lat, lng}, this.map.getZoom() ,{
          "animate": true,
          "pan": {
            "duration": 3
          }
        })
        this.http.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`).subscribe((data: any) => {
          console.log('Address Data',data)
          this.addressComponent = data.address 
          this.lati=data.lat; 
        this.longi=data.lon; 
          this.searchKey = data.display_name; 
          this.model.name=data.display_name;   
          this.model.latitude=data.lat; 
          this.model.longitude=data.lon; 
          
          
          
        })

      }
    } else {
      this.marker = L.marker([lat, lng],{icon:greenIcon}).on('click', () => {
        console.log('marker clicked');
         
      });
      this.map.addLayer(this.marker);
      this.map.setView({lat, lng}, this.map.getZoom() ,{
        "animate": true,
        "pan": {
          "duration": 3
        }
      })
      this.http.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`).subscribe((data: any) => {
        console.log('Address Data',data)
        this.addressComponent = data.address 
        this.lati=data.lat; 
        this.longi=data.lon; 
        this.searchKey = data.display_name; 
        this.model.name=data.display_name; 
        this.model.latitude=data.lat; 
        this.model.longitude=data.lon; 
        
      })
    }
    setTimeout(() => 
    { this.map.invalidateSize()}, 500 );

  }  
  geoInformation() { 
    
    this.geolocation.getCurrentPosition().then((data) => { 
       
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
    this.firestore.getAllDocuments("Marker").subscribe((e) => {
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
    //item.checked = !item.checked;
    this.model = item;
    this.addMarker(); 
    
  } 
  async openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    return await this.camera.getPicture(options)
    
  }
async openLibrary() {
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    targetWidth: 1000,
    targetHeight: 1000,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  };
  return await this.camera.getPicture(options)
  // .then((base64String)=> 
  // { 
  //   alert("base64 of captured image =" +base64String); 
  //   var obj ={ 
  //     ref:base64String
  //   }; 
  //   var reference:this; 
  //   firebase.database().ref('/Images').set(obj)
  // })
 
}  

async uploadFirebase() {
  const loading = await this.loadingController.create({
    duration: 2000
  });
  await loading.present(); 
  var rootRef=this.afSG.ref(this.imagePath) 
  console.log('rootRef' ,rootRef)
  var itemRef=rootRef.child(`Images/${new Date().getTime()}`) 
  console.log('itemRef',itemRef)
  this.upload = itemRef.putString(this.image, 'data_url');  
  // this.upload.then( res=>{
  //   var imagefile = res.task.snapshot.ref.getDownloadURL();
  //   imagefile.then( downloadableUrl=>{
  //     console.log("URL", downloadableUrl);
  //     this.database.doc(`Marker/`).update({
  //       treeUrl: downloadableUrl  ,
        
  //     });  
  //     firebase.database().ref('/Images').set(Object)
  //     this.model.treeUrl=downloadableUrl 
  //     console.log('url est ', this.model.treeUrl)
  //   })
  // }) 
  ///////firebase.database().ref('/Images').set(Object)
  this.upload.then(async () => {

    await loading.onDidDismiss();
   // this.image = 'https://www.kasterencultuur.nl/editor/placeholder.jpg';
    const alert = await this.alertController.create({
      header: 'Félicitation',
      message: 'L\'envoi de la photo est terminé!',
      buttons: ['OK']
    });
    await alert.present();
  }); 
  
} 
async uploadImagetoFirebase(event){

  const load = await this.loading.create({
    spinner:'dots',
  })
    load.present();
 
  const file = event.target.files;
  console.log(file);
  var fileName = file[0];
  console.log(fileName);

  if(fileName.type.split('/')[0] !=="image" ){
    console.error("File is not an Image");
    return;
  }

  this.isLoading = true;
  this.isLoaded = false;

  const path =  `Images/${new Date().getTime()}_${fileName.name}`;

  var fileRef = this.storage.ref(path);

  this.imageUpload = this.storage.upload(path,fileName);
  this.loading.dismiss();

  this.percentage = this.imageUpload.percentageChanges();

  this.imageUpload.then( res=>{
    var imagefile = res.task.snapshot.ref.getDownloadURL();
    imagefile.then( downloadableUrl=>{
      console.log("URL", downloadableUrl);
      this.database.doc(`Marker/${new Date().getTime()}`).update({
        photoUrl: downloadableUrl  
        
      });
    })
  })
 
  

} 
goToNextPage(){
  this.router.navigate(['map1']);
}

async addMarker() {
    if (!this.model.name ) {
      return;
    }
    if (!this.isEditing) {
      this.firestore.addDocument("Marker", this.model).then(() => {
        this.loadData();//refresh view
      });
    } else {
      this.firestore.updateDocument("Marker", this.model.id, this.model).then(() => {
        this.loadData();
        //refresh view 
        
      });
    }
    this.isEditing = false;
    //clear form
    //this.model.checked = false;
    this.model.name = ''; 
    this.model.latitude=''; 
    this.model.longitude='';
    this.model.treeNbr=''; 
    this.model.treename=''; 
    this.model.duedate=''; 
    this.model.treeUrl='';
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
    var greenIcon = new L.Icon({ 
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [20, 40],
      iconAnchor: [12, 40],
      popupAnchor: [1, -34],
      shadowSize: [20, 40]
    });
    
    
    this.markersS.getAllMarkers().subscribe((marker:any )=>{ 
       marker.forEach((singlemarker:any)=>{ 
         let markerGroup=L.featureGroup(); 
         let marker :any= L.marker([singlemarker.latitude,singlemarker.longitude] ,{icon:greenIcon}).addTo(this.map)
          .bindPopup("<ion-label>"+"l'emplacement  :"+singlemarker.name+"</ion-label>"+"<br>" +
          "<ion-label>"+"le nombre d'arbre :"+singlemarker.treeNbr+"</ion-label>"+"<br>" + 
          "<ion-label>"+"le nom d'arbre :"+singlemarker.treename+"</ion-label>"+"<br>"+
          "<ion-label>"+"image :"+singlemarker.treeUrl+"</ion-label>"+"<br>"
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
    this.firestore.deleteDocument("Marker", id).then(() => {
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
  segmentChanged(ev) {
    console.log('segment change', ev.target.value)
    this.slider.slideTo(ev.target.value)
  }
  slideChanged() {
    this.slider.getActiveIndex().then(index => {
      this.segment = index;
    });
    
  } 
  moveTodetails(){ 
    this.slider.getActiveIndex().then(index => {
      this.segment = 1;
    })}  
     async addPhoto(source: string) {
       if (source === 'camera') {
         console.log('camera');
         const cameraPhoto = await this.openCamera();
        this.image = 'data:image/jpg;base64,' + cameraPhoto;
      } else {
        console.log('library');
        const libraryImage = await this.openLibrary();
        this.image = 'data:image/jpg;base64,' + libraryImage;
      }
    } 
  

  
}
function bindPopup(arg0: string) {
  throw new Error('Function not implemented.');
}
function encodeGeoHash(lat: any, lng: any) {
  throw new Error('Function not implemented.');
}


function ionViewWillEnter() {
  throw new Error('Function not implemented.');
}
 