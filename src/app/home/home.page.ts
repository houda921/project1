import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AnimationController} from "@ionic/angular";
import { ModalController } from '@ionic/angular';
import { UsersStoriesModel } from 'src/app/models/UserStories'; 
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
}) 

export class HomePage implements OnInit { 
  images = [];
 isLoading = true;

darkMode:boolean=true; 

onOpenStory = new EventEmitter<UsersStoriesModel>();
  openMenu = false;
 // @ViewChild("button", { read: ElementRef, static: true }) button: ElementRef;
  option = {
    slidesPerView: 1,
    centeredSlides: true,
    loop: false,
    spaceBetween: 10,
    // autoplay:true,
  }
  optionCampings = {
    slidesPerView: 1.5,
    centeredSlides: true,
    loop: false,
    spaceBetween: 20,
    // autoplay:true,
  }
  
  
  constructor(  public modalCtrl: ModalController, private animationCtrl: AnimationController , public afDB: AngularFireDatabase,
    public afSG: AngularFireStorage) { 
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)'); 
    this.darkMode=prefersDark.matches; 
    this.getImagesDatabase();
   } 
   cambio(){ 
    this.darkMode=!this.darkMode;
    document.body.classList.toggle('dark');  
  }
 
  ngOnInit() {
  }
  ngAfterViewInit() {
    // this.pulseButton()
  }
  
Toggletheme(event) {
    //  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if(event.detail.checked){  
      console.log(event)
      document.body.setAttribute( 'color-theme','dark' );
    }
    else {  
      console.log(event)
      document.body.setAttribute('color-theme','light')
    }
  }
  tablestyle = 'bootstrap';
  customRowClass = false;

  getImagesDatabase() {
    this.afDB.list('Images/').snapshotChanges(['child_added']).subscribe(images => {
      images.forEach(image => {
        console.log('Image: ' + image.payload.exportVal().name); 
        this.getImagesStorage(image);
      });
    });
  } 
  getImagesStorage(image: any) { 
    //const imgRef = image.payload.exportVal().ref; 
    ///////////  
//     var rootRef=this.afSG.ref('Images') 
//   console.log('rootRef' ,rootRef)
//    // var rootRef=this.afSG.ref(imgRef) 
  
//   var itemRef=rootRef.child(`${new Date().getTime()}`) 
//   console.log('itemRef',itemRef)
  
//     /////////
//  itemRef.getDownloadURL().subscribe(imgUrl => {
//     console.log(imgUrl);
//     this.images.push({
//       name: image.payload.exportVal().name,
//       url: imgUrl
//     });
//   }); 
const imgRef = image.payload.exportVal().ref;

this.afSG.ref(imgRef).getDownloadURL().subscribe(imgUrl => {
  console.log(imgUrl);
  this.images.push({
    name: image.payload.exportVal().name,
    url: imgUrl
  });
});
  }

  switchStyle() {
    if (this.tablestyle == 'dark') {
      this.tablestyle = 'bootstrap';
    } else {
      this.tablestyle = 'dark';
    }
  }
  dismiss(){
    this.modalCtrl.dismiss()
  }

  
  togglePopupMenu() {
    return this.openMenu = !this.openMenu;
  }

//stories



openStory(event: Event, story: UsersStoriesModel) {
  this.onOpenStory.emit(story);
}

trackByStory(index) {
  return index;
}

}
