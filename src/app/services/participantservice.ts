import { Injectable } from "@angular/core";
//import { constructor } from "localforage";

import 'rxjs/add/operator/map';
import firebase from 'firebase';
 
// import { AngularFireDatabase } from "angularfire2/database";

// import { AngularFireDatabaseModule } from "angularfire2/database";
// import { AngularFireAuth } from "angularfire2/auth";

import { Participant } from "../models/participant";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";
@Injectable()
export class User_profile
{
    private data:any;
    public fireAuth:any;
    public userProfile:any;
    profile ={} as Participant;
    private profilesListRef=this.db.list<Participant>('/verified');
     
      
    
    constructor(private afAuth:AngularFireAuth,private db:AngularFireDatabase){
    
    
        this.userProfile=firebase.database().ref('verified/');
    }
    
    getProfilesList(){
        return this.profilesListRef;
    }
    viewUser(userId:any){
        var userRef=this.userProfile.child(userId);
        return userRef.once('value');
    }
    addProfile(profile:Participant){
     return this.profilesListRef.push(profile);
    
    }
    editprofile(profile:Participant){
        return this.profilesListRef.update(profile.key,profile);
    }
    removeprofile(profile:Participant){
        return this.profilesListRef.remove(profile.key);
    }
    }
     