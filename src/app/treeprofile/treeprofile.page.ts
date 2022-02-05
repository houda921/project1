import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/app';
import { AuthService } from 'src/app/services/authservice';
export interface imageData{
  fileName: string;
  filePath: string;
  size: string;
}
@Component({
  selector: 'app-treeprofile',
  templateUrl: './treeprofile.page.html',
  styleUrls: ['./treeprofile.page.scss'],
})
export class TreeprofilePage implements OnInit { 
  profile: any;
  profiletreeName: any;
  profileImageUrl: any;
  profileEmail: any;  
  profiletreeNbr:any ;
  openMenu = false;
  //duedate:string ;
  constructor(private database : AngularFirestore,private authservice: AuthService , private router :Router ,private route: ActivatedRoute) {
    firebase.auth().onAuthStateChanged(user => {
      console.log("AUTH_USER", user);

      if (user) {
        const result = this.database.doc(`/treeprofile/${this.authservice.getUID()}`);
        var userprofile = result.valueChanges();
        userprofile.subscribe(profile => {
          console.log("PROFILE::", profile);
           this.profileImageUrl = profile['treeUrl'];
           
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