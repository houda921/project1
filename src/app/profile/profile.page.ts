import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/app'; 
import {User} from '../models/User';
import { AuthService } from 'src/app/services/authservice';
export interface imageData{
  fileName: string;
  filePath: string;
  size: string;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {  
  user ={} as User 
  profile: any;
  profileName: any;
  profileImageUrl: any;
  profileEmail: any;  
  profileNum:any ;
  openMenu = false;
  duedate:string ;
  constructor(private database : AngularFirestore,private authservice: AuthService , private router :Router ,private route: ActivatedRoute) {
    firebase.auth().onAuthStateChanged(user => {
      console.log("AUTH_USER", user);

      if (user) {
        const result = this.database.doc(`/profile/${this.authservice.getUID()}`);
        var userprofile = result.valueChanges();
        userprofile.subscribe(profile => {
          console.log("PROFILE::", profile);
           this.profileName = profile['name']; 
           this.profileNum = profile['phone'];
           this.profileImageUrl = profile['photoUrl'];
           this.profileEmail = profile['email'];
        })
      }
    })
   }

  ngOnInit() {
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
  
}