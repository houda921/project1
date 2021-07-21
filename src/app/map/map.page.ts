import { Component } from '@angular/core'; 
import { ViewChild,ElementRef } from '@angular/core'; 
import { ActionSheetController, AlertController } from '@ionic/angular';   
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Environment
} from '@ionic-native/google-maps';
import {Marker } from '@ionic-native/google-maps';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import {NativeGeocoder , NativeGeocoderResult, NativeGeocoderOptions} from '@ionic-native/native-geocoder/ngx';

//import { url } from 'inspector';

declare var google:any; 
// interface Marker { 
//   position:{ 
//       lat:number , 
//       lng:number,
//   } ; 
//   title:string;
// }

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss'],
})  

export class MapPage  { 
  map:any ;  
  @ViewChild('map',{read:ElementRef,static:true}) mapRef:ElementRef;   
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  directionForm: FormGroup;
  //variable of info window 
  infoWindows: any=[];  
  //array of objects  
  //I must add a description of the location
  markers:any=[ 
     {title:"chebba" , 
     latitude:"35.213957", 
     longitude:"11.091523"  ,
      icon: {
       url: '../assets/icon/olive2.jpg', // image url
      scaledSize: new google.maps.Size(20, 20), // scaled size
     }
     
     }, 
     { 
     title:"sousse",
     latitude:"35.827485", 
     longitude:"10.640970"
     }, 
     
  ];  
  //alertController: AlertController;
  
  

  //alertController: any;
  
 
  //method and one of the ionic lifecycle method =>each time we open the page this method create a new map
  ionViewDidEnter()
  { this.showMap(); 
  this.addMarkersToMap(this.markers)}    
  constructor(private fb: FormBuilder,private nativeGeocoder: NativeGeocoder,private alertController: AlertController) { }
    
  // camera: {
  //   target: {
  //     lat: 43.610769,
  //       lng: 3.876716
  //   },
  //     zoom: 12,
  //       tilt: 30
  // }
  //take a parameter of markers (array of objects )    
  /////////////////////
  // location=new google.maps.LatLng(34.738749,10.752514);
  // constructor(private alertController:AlertController ,private fb: FormBuilder) { 
  //   this.createDirectionForm();
     
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }
  // createDirectionForm() {
  //   this.directionForm = this.fb.group({
  //     destination: ['', Validators.required]
  //   });
  // } 
  // calculateAndDisplayRoute(formValues) {
  //   const that = this;
  //   this.directionsService.route({
  //     origin: this.location,
  //     destination: formValues.destination,
  //     travelMode: 'DRIVING'
  //   }, (response, status) => {
  //     if (status === 'OK') {
  //       that.directionsDisplay.setDirections(response);
  //     } else {
  //       window.alert('Directions request failed due to ' + status);
  //     }
  //   });
  // } 
  //////////////

  addMarkersToMap(markers){ 
    for (let marker of markers)
    { 
      let position=new google.maps.LatLng(marker.latitude ,marker.longitude);
      let mapMarker=new google.maps.Marker({ 
        position:position, 
        title:marker.title, 
        latitude:marker.latitude, 
        longitude:marker.longitude ,
        draggable:true 
       
      }); 
      console.log(mapMarker)
      mapMarker.setMap(this.map) ;
      this.addInfoWindowMarker(mapMarker);
    }
  }  
  //method that place the markers at google map 
  addInfoWindowMarker( marker)
  { 
    
    let infoWindowContent='<div id="content"></div>'+'<h2 id="firstHeading" class2firstHeading">' + marker.title +
    '</h2>' + '<p> latitude:' +marker.latitude+'</p>'+
    '<p>Longitude: ' +marker.longitude+'</p>'+
    '</div>'; 
    let infoWindow= new google.maps.InfoWindow({ 
      content: infoWindowContent 
    });  
    
     marker.addListener('dragend',()=>
       {  
         console.log('before the location');
        let location={  
           latitude: marker.getPosition().lat(), 
           longitude:marker.getPosition().lng() ,
         }  
         console.log('after the location');
        console.log(location);
       })
    marker.addListener('click',()=> {
    this.closeAllInfoWindows(); 
    infoWindow.open(this.map ,marker); }); 
    this.infoWindows.push(infoWindow); 

  }   
  closeAllInfoWindows()
  { 
    for(let window of this.infoWindows)

    { 
      window.close();
    }
  }


  showMap()
  { //latitude et longitude de sfax
    const location=new google.maps.LatLng(34.738749,10.752514); 
    const options={ 
      center:location,
      zoom:5.75, 
      //permet d'afficher le zoom in et zoom out 
      disableDefaultUI:false 
    }  
    
    //the variable map is going to contain a new google map which contain a map element ref widh contain these options
    this.map=new google.maps.Map(this.mapRef.nativeElement,options); 
    this.addMarkersToMap(this.markers); 
    let options1: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
  };
  
  this.nativeGeocoder.reverseGeocode(34.738749, 10.752514, options1)
    .then((result: NativeGeocoderResult[]) => console.log(JSON.stringify(result[0])))
    .catch((error: any) => console.log(error));
  
  this.nativeGeocoder.forwardGeocode('Berlin', options1)
    .then((result: NativeGeocoderResult[]) => console.log('The coordinates are latitude=' + result[0].latitude + ' and longitude=' + result[0].longitude))
    .catch((error: any) => console.log(error));
  }   
   


  placeMarker(markerTitle: string) {
    const marker: Marker = this.map.addMarkerSync({
       title: markerTitle,
       icon: 'red',
       animation: 'DROP',
       position: this.map.getCameraPosition().target
    });
 } 
 async addMarker() {
  const alert = await this.alertController.create({
    header: 'Ajouter un emplacement',
    inputs: [
      {
        name: 'title',
        type: 'text',
        placeholder: 'Le titre'
      }
    ],
    buttons: [
      {
        text: 'Annuler',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Ajouter',
        handler: data => {
          console.log('Titre: ' + data.title);
          this.placeMarker(data.title); 
          console.log('Titre: ' + data.title);
this.placeMarker(data.title); 

        }
      }
    ]
  });
  await alert.present(); 
  
} 









  /////////////////////////////
  // async addMarker()
  // { 
  //      marker: this.markers;
  //      const alert = await this.alertController.create({
  //       cssClass: 'my-custom-class',
  //       header: 'you want to add an other tree?',
  //       inputs: [
  //         {
  //           name: 'name2',
  //           type: 'text',
  //           id: 'name2-id',
  //           // value: '',
  //           // placeholder: ''
  //         },
          
  //       ],
  //       buttons: [
  //         {
  //           text: 'No',
  //           role: 'cancel',
            
  //           handler: () => {
  //             console.log('Confirm Cancel');
  //           }
  //         },
  //          {
  //           text: 'Yes',
  //           handler: markers => {
  //             console.log('title'+ this.markers.title);
  //           }
  //         }
  //       ]
  //     });
  
  //     await alert.present();
  //   } 

  } 
  


