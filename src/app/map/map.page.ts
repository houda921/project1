 import { Component, OnInit } from '@angular/core'; 
 import { ViewChild, ElementRef } from '@angular/core';
import * as Leaflet from 'leaflet';
import { ScrollDetail } from '@ionic/core'; 
import { IonSlides} from '@ionic/angular';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { map, single } from 'rxjs/operators'; 
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import { AngularFirestore } from '@angular/fire/firestore';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { NativeGeocoder,NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { MarkersService } from 'src/app/services/markers.service';
import { Router } from '@angular/router';
import { Map, tileLayer, marker, icon } from 'leaflet'; 
import { Platform } from '@ionic/angular'; 
import { HttpClient } from '@angular/common/http'; 
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {  NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
}) 

export class MapPage  {
  [x: string]: any;
  markers=[]; 
  propertyList = [];
  customMarker; 
  
  firebaseData={ 
    name:'', 
    
    latitude:'' , 
    longitude:'',
  treeNbr:'' ,
  treename:'' , 
  adresse:'', 
  treeUrl:''
   };
  openMenu = false;
  map: Leaflet.Map;
  addressElement: HTMLInputElement = null;
  
  showToolbar = false; 
  
  marker: Leaflet.Marker;
  segment = 0;
  searchKey: string;
  places = [];
  isMarkerSet: boolean = false;

  addressComponent: any; 
  lati:any ; 
  longi:any; 
 
 @ViewChild('slides', { static: false }) slider: IonSlides;

  constructor(public http: HttpClient,
    public plt: Platform, public router:Router ,public modalCtrl: ModalController ,public firestore:AngularFirestore  ,public navCtrl:NavController ,private alertCtrl:AlertController ,private markersS: MarkersService ,private nativeGeocoder:NativeGeocoder) { 
this.firestore.collection('Marker').snapshotChanges(['added','removed','modified']) 
.subscribe(actions=>{ 
  { 
    actions.forEach(action=> 
      { 
        console.log('name ' + action.payload.doc.data()['name']); 
        console.log('latitude ' + action.payload.doc.data()['latitude']); 
        console.log('longitude' + action.payload.doc.data()['longitude']);  
        console.log('treeNbr' + action.payload.doc.data()['treeNbr']);  
        console.log("le nom de Leaflet'arbre  " + action.payload.doc.data()['treename']); 
        console.log("le nom de Leaflet'arbre  " + action.payload.doc.data()['adresse']); 
        this.markers.push({ 
          name :action.payload.doc.data()['name'], 
          latitude:action.payload.doc.data()['latitude'], 
          longitude:action.payload.doc.data()['longitude'], 
          nombre:action.payload.doc.data()['treeNbr'], 
          treename:action.payload.doc.data()['treename'], 
          adresse:action.payload.doc.data()['adresse'],
          treeUrl:action.payload.doc.data()['treeUrl'],
        });
      });
  }
}); 

   }  
   
   addFirebase(){ 
     this.firestore.collection('Marker').add(this.firebaseData); 
     this.firebaseData={ 
      name: '',
      latitude: '',
      longitude:'', 
      treeNbr:'', 
      treename:'', 
      adresse:'', 
      treeUrl:''
     };
   }
  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 225;
    }
} 

  ionViewDidEnter() {
    this.loadMap();
  }   
 

   loadMap(){ 
     this.map = new Leaflet.Map('map').setView([34.696299, 9.201986], 6.25);
  
     Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
       attribution: 'zitouna'
     }).addTo(this.map); 
     Leaflet.Control.geocoder().addTo(this.map);  
     console.log('hoooooooooooolaaaaaaa')
     this.loadMarkers();
    
    }
  //     //   fetch('https://console.firebase.google.com/project/gleaming-medium-317921/firestore/data/~2Fprofile~2FUHVjRy2IXqbDZgE3w1JTATUveb93')
  //     //     .then(res => res.firestore)
  //     //    .then(data => {
  //     //       this.propertyList = data.Markers;
  //     //       this.leafletMap();
  //     //   })
  //     //  .catch(err => console.error(err));

     
  // } 
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
       marker.forEach((singlemarker)=>{ 
         let markerGroup=Leaflet.featureGroup(); 
         let marker :any= Leaflet.marker([singlemarker.latitude,singlemarker.longitude] ,{icon:greenIcon}).addTo(this.map)
          .bindPopup("<ion-label>"+"l'adresse  :"+singlemarker.name+"</ion-label>"+"<br>" +
          "<ion-label>"+"le nombre d'arbre :"+singlemarker.treeNbr+"</ion-label>"+"<br>" + 
          "<ion-label>"+"le nom d'arbre :"+singlemarker.treename+"</ion-label>"+"<br>" 
         
          ).openPopup();
          markerGroup.addLayer(marker);  
       this.map.addLayer(markerGroup); 
         }) 
       })
     
  }
  async addMarker(){ 
    let prompt = await this.alertCtrl.create({ 
      
      message:"Vous voulez ajouter un arbre ? ",  
      buttons:[ 
        { 
          text:'Non ', 
          handler:data =>{ 
            console.log('Cancel clicked ');
          }
        }, 
         {
        text:'Oui', 
        handler:data =>{  
          this.router.navigate(['/map1']);
          //this.geoCodeandAdd(data.city);  
        
        } }
        
      ]

    }); 
    //prompt.present(); 
    await prompt.present();  
    const result = await prompt.onDidDismiss();  
    console.log(result);
  } 
  geoCodeandAdd(city)
  { 
this.nativeGeocoder.forwardGeocode(city).then((coordinates:NativeGeocoderResult[])=>{ 
  
    this.MarkersService.saveMarkers(coordinates[0])
}).catch((error:any)=>console.log(error));
  }  
  //load marker from the firestore
  

  leafletMap() {
    var FamousMarkers = new Leaflet.Icon({
      iconUrl: '../../pins/famous-campings.png',
      iconSize: [41, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    }); 
    for (const property of this.propertyList) {
    //var image=property.image;
   
      Leaflet.marker([property.lat, property.long],{icon:FamousMarkers}).addTo(this.map)
        .bindPopup("<ion-label>"+"Destination  :"+property.name+"</ion-label>"+"<br>"
        +"<br>"+"Note:"+'<ion-icon color="warning" name="star"></ion-icon>'+'<ion-icon color="warning" name="star"></ion-icon>'
        +'<ion-icon color="warning" name="star"></ion-icon>'+'<ion-icon color="warning" name="star"></ion-icon>'+
        '<ion-icon color="warning" name="star"></ion-icon>'+
        "<br>"+"View :"+'<ion-icon color="warning" name="star"></ion-icon>'+'<ion-icon color="warning" name="star"></ion-icon>'
        +'<ion-icon color="warning" name="star"></ion-icon>'+'<ion-icon color="warning" name="star"></ion-icon>'+
        '<ion-icon color="warning" name="star"></ion-icon>'+
        
        "<br>"+"Security :"+'<ion-icon color="warning" name="star"></ion-icon>'+'<ion-icon color="warning" name="star"></ion-icon>'
        +'<ion-icon color="warning" name="star"></ion-icon>'+'<ion-icon color="warning" name="star"></ion-icon>')
        .openPopup();
    } 
    
  } 
  
  search() {
    if (this.searchKey === '') {
      this.places = [];
    } else  {
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
    console.log('here is my marker') 
  }
 

  setMarkertWithAnimation(lat, lng, force: boolean) { 
    var greenIcon = new Leaflet.Icon({ 
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
        this.marker = Leaflet.marker([lat, lng],{icon:greenIcon}).on('click', () => {
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
          this.longi=data.lng;
          this.searchKey = data.display_name;
        })

      }
    } else {
      this.marker = Leaflet.marker([lat, lng],{icon:greenIcon}).on('click', () => {
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
      })
    } 
    
    setTimeout(() => 
    { this.map.invalidateSize()}, 500 );

  } 
 
  ionViewWillLeave() {
    this.map.remove();
  }
  dismiss(){
    this.modalCtrl.dismiss()
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
}

function bindPopup(arg0: string) {
  throw new Error('Function not implemented.');
}
function encodeGeoHash(lat: any, lng: any) {
  throw new Error('Function not implemented.');
}

